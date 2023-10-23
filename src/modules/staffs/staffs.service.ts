import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, Transaction } from 'objection';
import { StaffModel } from './entities/staff.model';
import { BaseService } from 'src/core/utils/base-service';

@Injectable()
export class StaffsService extends BaseService {
  constructor(
    @Inject(StaffModel.name) private staffModel: ModelClass<StaffModel>,
  ) {
    super(StaffsService.name);
  }

  /**
   * Finds and returns an staff by email, or undefined if no staff is found
   * @param {string} email Email to find a staff by
   * @param {Transaction} trx? Optional transaction to use for the query
   * @returns {Promise<StaffModel>} Staff found or undefined value
   */
  async findByEmail(email: string, trx?: Transaction): Promise<StaffModel> {
    const staff = await this.staffModel.query(trx).findOne({ email });
    return staff;
  }

  /**
   * Finds and returns an staff by id, or undefined if no staff is found
   * @param {string} id Id to find a staff by
   * @param {Transaction} trx? Optional transaction to use for the query
   * @returns {Promise<StaffModel>} Staff found or undefined value
   */
  async findAndReturnById(id: string, trx?: Transaction): Promise<StaffModel> {
    const staff = await this.staffModel.query(trx).findById(id);
    delete staff.encrypted_password;
    return staff;
  }
}
