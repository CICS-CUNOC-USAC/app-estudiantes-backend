import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffModel } from 'src/modules/staffs/entities/staff.model';
import { StaffsService } from 'src/modules/staffs/staffs.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { BaseService } from 'src/core/utils/base-service';
import { QueryBuilder, Model } from 'objection';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { MetricsService } from 'src/modules/metrics/metrics.service';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { RefreshTokenModel } from '../refresh-tokens/entities/refresh-token.model';

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
    private readonly metricsService: MetricsService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {
    super(StaffAuthService.name);
  }

  /**
   * Generates access and refresh tokens for the staff user and returns them along with the user
   * @param staff Staff to generate tokens for
   * @param deviceInfo Optional device info from User-Agent header
   * @param ipAddress Optional IP address
   */
  async login(staff: StaffModel, deviceInfo?: string, ipAddress?: string) {
    if (staff.roles.length <= 0) {
      throw new UnauthorizedException({
        statusCode: 403,
        message:
          "You don't have permission to authenticate as this user. No roles assigned.",
        error: 'Forbidden',
      });
    }
    const { access_token, refresh_token } = await this.generateTokenPair(
      staff,
      deviceInfo,
      ipAddress,
    );
    return { staff, access_token, refresh_token };
  }

  /**
   * Issues a new access/refresh token pair by validating the given refresh token (rotation)
   * @param rawRefreshToken Opaque refresh token from the client
   * @param deviceInfo Optional device info
   * @param ipAddress Optional IP address
   */
  async refresh(
    rawRefreshToken: string,
    deviceInfo?: string,
    ipAddress?: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const record = await this.refreshTokensService.verify(rawRefreshToken);
    const staff = await this.staffsService.findAndReturnById(record.entity_id);

    // Rotate: revoke old token, issue new pair
    await this.refreshTokensService.revoke(rawRefreshToken);
    return this.generateTokenPair(staff, deviceInfo, ipAddress);
  }

  /**
   * Revokes the given refresh token (logout current session)
   * @param rawRefreshToken Opaque refresh token to invalidate
   */
  async logout(rawRefreshToken: string): Promise<void> {
    await this.refreshTokensService.revoke(rawRefreshToken);
  }

  /**
   * Revokes all refresh tokens for the staff user (logout all sessions)
   * @param staffId ID of the staff user
   */
  async logoutAll(staffId: number): Promise<void> {
    await this.refreshTokensService.revokeAll('staff', staffId);
  }

  /**
   * Returns all active sessions for the staff user
   * @param staffId ID of the staff user
   */
  async listSessions(staffId: number): Promise<RefreshTokenModel[]> {
    return this.refreshTokensService.listActive('staff', staffId);
  }

  /**
   * Revokes a specific session by its ID, ensuring it belongs to the staff user
   * @param sessionId ID of the refresh_token record
   * @param staffId ID of the authenticated staff user
   */
  async revokeSession(sessionId: number, staffId: number): Promise<void> {
    await this.refreshTokensService.revokeById(sessionId, 'staff', staffId);
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
      const result = match ? staff : undefined;
      this.metricsService.authAttemptsTotal.inc({
        result: result ? 'success' : 'failure',
      });
      return result;
    }
    this.metricsService.authAttemptsTotal.inc({ result: 'failure' });
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

  private async generateTokenPair(
    staff: StaffModel,
    deviceInfo?: string,
    ipAddress?: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const jti = crypto.randomUUID();
    const payload = { sub: staff.id, type: 'staff', jti };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
    const refresh_token = await this.refreshTokensService.create(
      'staff',
      staff.id,
      deviceInfo ?? null,
      ipAddress ?? null,
      jti,
    );
    return { access_token, refresh_token };
  }
}
