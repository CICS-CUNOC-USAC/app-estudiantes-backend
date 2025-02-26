import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/modules/users/entities/user.model';
import { UsersService } from 'src/modules/users/users.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';
import { ProfilesService } from 'src/modules/profiles/profiles.service';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/core/utils/base-service';
import { UpdateRegularProfileDto } from '../dto/update-profile-regular.dto';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { ProfileModel } from 'src/modules/profiles/entities/profile.model';
import { UserCoursesProgressService } from 'src/modules/user-courses-progress/user-courses-progress.service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

// This class is responsible for the authentication of regular users (students)
@Injectable()
export class RegularAuthService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(ProfileModel.name)
    private readonly profileModel: ModelClass<ProfileModel>,
    @Inject(UserModel.name)
    private readonly userModel: ModelClass<UserModel>,
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly userCoursesProgressService: UserCoursesProgressService,
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
      // Check if the RA is already in use
      const user: UserModel | undefined = await this.usersService.findByRa(
        createUserDto.ra,
        trx,
      );
      const userByEmail: UserModel | undefined =
        await this.usersService.findByEmail(createUserDto.email, trx);

      const error: IGeneralError = {
        statusCode: 400,
        message: [],
        error: 'Bad Request',
      };

      if (user !== undefined) {
        (error.message as object[]).push({
          ra: 'Registro Académico ya en uso',
        });
      }
      if (userByEmail !== undefined) {
        (error.message as object[]).push({
          email: 'Correo electrónico ya en uso',
        });
      }
      if ((error.message as object[]).length > 0) {
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

      // Also initialize the user's career progress (user_courses_progress)
      await this.userCoursesProgressService.create(
        createdUser.id,
        createdUser.career_code,
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
   * Updates the user's profile
   * @param updateProfileDto Data to update the profile with
   * @param profileId ID of the profile to update
   */
  async update(
    userId: number,
    profileId: number,
    updateProfileDto: UpdateRegularProfileDto,
  ) {
    const { user: userDto, ...profileDto } = updateProfileDto;
    // If there is data to update only the profile (not user), if applies
    return this.dbTrxService.databaseTransaction(async (trx) => {
      if (profileDto) {
        await this.profileModel
          .query(trx)
          .findById(profileId)
          .patch(profileDto);
      }
      // update the password if applies
      if (userDto) {
        const { email, password } = userDto;
        if (email) {
          // todo: update email (if applies, and verify if it already exists)
          await this.usersService.updateEmail(userId, email, trx);
        }
        if (password) {
          // todo: update password (if applies)
          await this.usersService.updatePassword(userId, password, trx);
        }
      }
      // Return the updated profile
      return this.usersService.findAndReturnById(userId, trx);
    }, this.logger);
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
