import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from './entities/user.model';
import { ModelClass, Transaction } from 'objection';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserModel.name) private userModel: ModelClass<UserModel>,
  ) {}

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
  async findAndReturnById(id: string, trx?: Transaction): Promise<UserModel> {
    const user = await this.userModel
      .query(trx)
      .withGraphFetched('profile')
      .findById(id);
    return user;
  }
}
