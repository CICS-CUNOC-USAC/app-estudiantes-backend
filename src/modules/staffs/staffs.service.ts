import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { StaffModel } from './entities/staff.model';
import { BaseService } from 'src/core/utils/base-service';
import { CreateStaffDto } from './dto/create-staff.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';
import { StaffsQueryDto } from './dto/staff-query.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffsService extends BaseService {
  constructor(
    @Inject(StaffModel.name) private staffModel: ModelClass<StaffModel>,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(StaffsService.name);
  }

  /**
   * Creates a new staff member in the database.
   * @param createStaffDto - The DTO containing the information of the staff member to be created.
   * @returns A Promise that resolves to the created staff member.
   * @throws BadRequestException if a staff member with the same email already exists.
   */
  async create(createStaffDto: CreateStaffDto) {
    return this.dbTrxService.databaseTransaction(async (trx) => {
      // Check first if the staff already exists
      const staff = await this.findByEmail(createStaffDto.email, trx);

      if (staff) {
        const error: IGeneralError = {
          error: 'Conflict',
          message: 'Staff with this email already exists',
          statusCode: 409,
        };
        throw new BadRequestException(error);
      }

      // Create the new staff
      // Note: This only creates the staff with no roles
      // Functionality to add roles to the staff will be handled in another endpoint
      const encryptedPassword = await this.hashPassword(
        createStaffDto.password,
      );
      const createdStaff = await this.staffModel.query().insert({
        first_name: createStaffDto.first_name,
        last_name: createStaffDto.last_name,
        email: createStaffDto.email,
        encrypted_password: encryptedPassword,
      });
      return this.findAndReturnById(createdStaff.$id(), trx);
    }, this.logger);
  }

  /**
   * Updates a staff member with the given ID using the provided data.
   * @param staffId The ID of the staff member to update.
   * @param updateStaffDto The data to use for the update.
   * @returns A Promise that resolves to the updated staff member.
   */
  async update(staffId: number, updateStaffDto: UpdateStaffDto) {
    console.log('updateStaffDto', updateStaffDto);
    console.log('staffId', staffId);
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      // Update the staff
      await this.staffModel.query(trx).findById(staffId).patch({
        first_name: updateStaffDto.first_name,
        last_name: updateStaffDto.last_name,
      });

      // Update the email if it is different
      if (updateStaffDto.email)
        await this.updateEmail(staffId, updateStaffDto.email, trx);

      // Update the password if it is different
      if (updateStaffDto.password)
        await this.updatePassword(staffId, updateStaffDto.password, trx);

      return await this.findAndReturnById(staffId, trx);
    }, this.logger);
  }

  async updateEmail(staffId: number, email: string, trx?: Transaction) {
    // Check first if the email is already in use
    const staff = await this.findByEmail(email, trx);
    if (staff) {
      // Now check if the entered email is the same as the current one and don't update if it is
      if (staff.email === email && staff.id === staffId) {
        return;
      }

      // If the email is different but it is already in use, don't update and throw an error

      const error: IGeneralError = {
        statusCode: 409,
        message: 'Email already in use',
        error: 'Conflict',
      };
      throw new BadRequestException(error);

      // Finally, if the email is different and it is not in use, update it
    }
    await this.staffModel.query(trx).findById(staffId).patch({ email });
  }

  async updatePassword(
    staffId: number,
    newPassword: string,
    trx?: Transaction,
  ) {
    const newEncryptedPassword = await this.hashPassword(newPassword);
    await this.staffModel
      .query(trx)
      .findById(staffId)
      .patch({ encrypted_password: newEncryptedPassword });
  }

  async findAll(queryDto: StaffsQueryDto) {
    const paginationOptions = this.createPaginationOptions(queryDto);
    const resultsQueryBuilder = this.staffModel
      .query()
      .select([
        'id',
        'first_name',
        'last_name',
        'email',
        'created_at',
        'updated_at',
      ])
      .withGraphFetched('roles')
      .modifyGraph('roles', (builder) => {
        builder.select('roles.name', 'roles.alias');
      })
      .where((builder) => this.queryFilters(queryDto, builder))
      .orderBy(paginationOptions.orderBy);
    return this.getCompletePaginatedResponse(
      await this.getPaginatedResults(resultsQueryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  /**
   * Finds and returns an staff by email, or undefined if no staff is found
   * @param {string} email Email to find a staff by
   * @param {Transaction} trx? Optional transaction to use for the query
   * @returns {Promise<StaffModel>} Staff found or undefined value
   */
  async findByEmail(email: string, trx?: Transaction): Promise<StaffModel> {
    const staff = await this.staffModel
      .query(trx)
      .findOne({ email })
      .withGraphFetched('roles');
    return staff;
  }

  /**
   * Finds and returns an staff by id, or undefined if no staff is found
   * @param {string} id Id to find a staff by
   * @param {Transaction} trx? Optional transaction to use for the query
   * @returns {Promise<StaffModel>} Staff found or undefined value
   */
  async findAndReturnById(id: number, trx?: Transaction): Promise<StaffModel> {
    const staff = await this.staffModel
      .query(trx)
      .findById(id)
      .withGraphFetched('roles')
      .modifyGraph('roles', (builder) => {
        builder.select('roles.id', 'roles.name', 'roles.alias');
      });
    if (staff) delete staff.encrypted_password;
    return staff;
  }

  /**
   * Hashes a given password using bcrypt.
   * @param password The password to hash.
   * @returns A Promise that resolves to the hashed password.
   */
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  queryFilters(
    queryDto: StaffsQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (queryDto.name) {
      builder.andWhere(
        'name',
        'ilike',
        `%${this.normalizeString(queryDto.name)}%`,
      );
    }
    if (queryDto.email) {
      builder.andWhere(
        'email',
        'ilike',
        `%${this.normalizeString(queryDto.email)}%`,
      );
    }
    return builder;
  }
}
