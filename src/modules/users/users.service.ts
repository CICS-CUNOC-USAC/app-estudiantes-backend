import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserModel } from './entities/user.model';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/core/utils/base-service';
import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

@Injectable()
export class UsersService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(UserModel.name) private userModel: ModelClass<UserModel>,
  ) {
    super(UsersService.name);
  }

  /**
   * Creates a new user with the given data
   *
   * @param {number} profileId ID of the profile to set to the new user
   * @param {CreateUserDto} createUserDto DTO containing the information to create the user
   * @param {Transaction} trx Transaction to use for the operation
   */
  async create(
    profileId: number,
    createUserDto: CreateUserDto,
    trx?: Transaction | null,
  ) {
    const encryptedPassword = await this.hashPassword(createUserDto.password);
    await this.userModel.query(trx).insert({
      email: createUserDto.email,
      username: createUserDto.username,
      ra: createUserDto.ra,
      career_code: createUserDto.career_code,
      encrypted_password: encryptedPassword,
      profile_id: profileId,
    });
  }

  /**
   * Updates the email of an user
   * @param {number} id ID of the user to update
   * @param {string} email New email to set to the user
   * @param {Transaction} trx Transaction to use for the operation
   */
  async updateEmail(
    id: number,
    email: string,
    trx?: Transaction,
  ): Promise<void> {
    // First, validate if the email is already in use
    const user = await this.findByEmail(email, trx);
    if (user) {
      // First check if the entered email is the same as the current one and don't update if it is
      if (user.email === email) {
        return;
      }
      // If the email is different but it is already in use, throw an error
      const error: IGeneralError = {
        statusCode: 400,
        message: [
          {
            email: 'Email is already in use',
          },
        ],
        error: 'Bad Request',
      };
      throw new BadRequestException(error);
    }
    await this.userModel.query(trx).findById(id).patch({ email });
  }

  /**
   * Updated the password of an user
   * @param {number} id ID of the user to update
   * @param {string} password New password to set to the user
   * @param {Transaction} trx Transaction to use for the operation
   * @returns {Promise<void>}
   */
  async updatePassword(
    id: number,
    newPassword: string,
    trx?: Transaction,
  ): Promise<void> {
    const newEncryptedPassword = await this.hashPassword(newPassword);
    await this.userModel
      .query(trx)
      .findById(id)
      .patch({ encrypted_password: newEncryptedPassword });
  }

  /**
   * Finds and returns an user by email, or undefined if no user is found
   *
   * @param {string} email Email to find a user by
   * @param {Transaction} trx? Optional transaction to use for the query
   * @returns {Promise<UserModel>} User found or undefined value
   */
  async findByEmail(email: string, trx?: Transaction): Promise<UserModel> {
    const user = await this.userModel
      .query(trx)
      .withGraphFetched('profile')
      .withGraphFetched('career')
      .findOne({ email });
    return user;
  }

  async findByRa(ra: string, trx?: Transaction): Promise<UserModel> {
    const user = await this.userModel
      .query(trx)
      .withGraphFetched('profile')
      .withGraphFetched('career')
      .findOne({ ra });
    return user;
  }

  async findByUsername(username: string, trx?: Transaction): Promise<UserModel> {
    const user = await this.userModel
      .query(trx)
      .withGraphFetched('profile')
      .withGraphFetched('career')
      .findOne({ username });
    return user;
  }

  async findExistant(email: string, ra: string, username: string, trx?: Transaction): Promise<UserModel> {
    return await this.userModel
      .query(trx)
      .withGraphFetched('profile')
      .withGraphFetched('career')
      .where(function() {
        this.where('ra', ra)
          .orWhere('email', email)
          .orWhere('username', username);
      })
      .first();
  }

  /**
   * Finds and returns an user by id, or undefined if no user is found
   * @param {string} id Id to find a user by
   * @param {Transaction} trx? Optional transaction to use for the query
   * @returns {Promise<UserModel>} User found or undefined value
   */
  async findAndReturnById(
    id: string | number,
    trx?: Transaction,
  ): Promise<UserModel> {
    const user = await this.userModel
      .query(trx)
      .withGraphFetched('profile')
      .withGraphFetched('career')
      .findById(id);
    delete user.encrypted_password;
    return user;
  }

  // Private methods
  /**
   * Hashes password for a user
   *
   * @param {string} password password string that will be hashed
   * @returns {Promise<string>} hashed password
   */
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
