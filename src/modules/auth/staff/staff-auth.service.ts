import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffModel } from 'src/modules/staffs/entities/staff.model';
import { StaffsService } from 'src/modules/staffs/staffs.service';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/core/utils/base-service';
import { QueryBuilder, Model } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

// This class is responsible for the authentication of staffs users (admins)
@Injectable()
export class StaffAuthService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly staffsService: StaffsService,
    private jwtService: JwtService,
  ) {
    super(StaffAuthService.name);
  }

  /**
   * Generates a JWT token for the staff user and returns it along with the user
   * @param staff Staff to generate the token for
   */
  async login(staff: StaffModel) {
    if (staff.roles.length <= 0) {
      throw new UnauthorizedException({
        statusCode: 403,
        message:
          "You don't have permission to authenticate as this user. No roles assigned.",
        error: 'Forbidden',
      });
    }
    const token = await this.jwtService.signAsync(staff.toJSON());
    return { staff, token };
  }

  /**
   * Returns the staffs's complete profile
   * @param staff Staff to get the profile for
   */
  async myProfile(staff: any) {
    const completeStaff = await this.staffsService.findAndReturnById(staff.id);
    return completeStaff;
  }

  /**
   * Validates staff credentials and returns the staff user if valid, or undefined if not
   *
   * @param {string} email Email of the staff to validate
   * @param {string} password Password of the staff to validate
   * @returns {Promise<StaffModel>} Staff if valid, undefined if not
   */
  async validateStaffCredentials(
    email: string,
    password: string,
  ): Promise<StaffModel> {
    const staff = await this.staffsService.findByEmail(email);
    if (staff) {
      const match = await this.comparePasswords(
        password,
        staff.encrypted_password,
      );
      delete staff.encrypted_password;

      return match ? staff : undefined;
    }
  }

  /**
   * Compares a plain password with a hashed password
   * @param {string} enteredPassword Plain password to compare
   * @param {string} hashedPassword Hashed password to compare
   * @returns {Promise<boolean>} True if the passwords match, false if not
   * @private
   */
  private async comparePasswords(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const match: boolean = await bcrypt.compare(
      enteredPassword || '',
      hashedPassword || '',
    );
    return match;
  }
}
