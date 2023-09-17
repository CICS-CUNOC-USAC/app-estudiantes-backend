import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from './entities/user.model';
import { ModelClass, Transaction } from 'objection';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/core/utils/base-service';

@Injectable()
export class UsersService extends BaseService {
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
      ra: createUserDto.ra,
      encrypted_password: encryptedPassword,
      profile_id: profileId,
    });
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
      .findOne({ email });
    return user;
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
