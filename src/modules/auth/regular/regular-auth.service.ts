import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/modules/users/entities/user.model';
import { UsersService } from 'src/modules/users/users.service';

// This class is responsible for the authentication of regular users (students)
@Injectable()
export class RegularAuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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
    // We will implement bycrypt later, let's just compare plain for now
    const match = enteredPassword === hashedPassword;
    return match;
  }
}
