import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/modules/users/entities/user.model';
import { UsersService } from 'src/modules/users/users.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';
import { ProfilesService } from 'src/modules/profiles/profiles.service';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/core/utils/base-service';

// This class is responsible for the authentication of regular users (students)
@Injectable()
export class RegularAuthService extends BaseService {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private jwtService: JwtService,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(RegularAuthService.name);
  }

  /**
   * Creates a new profile with its user and logs the user in
   * @param {SignUpDto} Data to create the new profile with
   * @returns {Promise<object>} User and token
   */
  async signUp(signUpDto: SignUpDto): Promise<{
    user: UserModel;
    token: string;
  }> {
    // Deconstruct the DTO
    const { user: createUserDto, ...profileDto } = signUpDto;

    // Save the profile and user
    return this.dbTrxService.databaseTransaction<{
      user: UserModel;
      token: string;
    }>(async (trx) => {
      // Check first if the user already exists
      const user: UserModel | undefined = await this.usersService.findByEmail(
        createUserDto.email,
        trx,
      );

      // Return error if the user already exists
      if (user !== undefined) {
        const error: IGeneralError = {
          statusCode: 400,
          message: [
            {
              email: 'Email already exists',
            },
          ],
          error: 'Bad Request',
        };
        throw new BadRequestException(error);
      }

      // Create the profile along with the user
      const profile = await this.profilesService.create(
        createUserDto,
        profileDto,
        trx,
      );

      // Get the created user
      const createdUser = await this.usersService.findAndReturnById(
        profile.user.id,
        trx,
      );

      // Return the auth token and the user
      const token = await this.jwtService.signAsync(createdUser.toJSON());

      return { user: createdUser, token };
    }, this.logger);
  }

  /**
   * Generates a JWT token for the user and returns it along with the user
   * @param user User to generate the token for
   */
  async login(user: UserModel) {
    const token = await this.jwtService.signAsync(user.toJSON());
    return { user, token };
  }

  /**
   * Returns the user's complete profile
   * @param user User to get the profile for
   */
  async myProfile(user: any) {
    const userWithProfile = await this.usersService.findAndReturnById(user.id);
    delete userWithProfile.encrypted_password;
    return userWithProfile;
  }

  /**
   * Validates user credentials and returns the user if valid, or undefined if not
   *
   * @param {string} email Email of the user to validate
   * @param {string} password Password of the user to validate
   * @returns {Promise<UserModel>} User if valid, undefined if not
   */
  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<UserModel> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const match = await this.comparePasswords(
        password,
        user.encrypted_password,
      );
      delete user.encrypted_password;
      return match ? user : undefined;
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
