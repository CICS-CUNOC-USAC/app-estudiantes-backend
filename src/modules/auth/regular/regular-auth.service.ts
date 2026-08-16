import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/modules/users/entities/user.model';
import { UsersService } from 'src/modules/users/users.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';
import { ProfilesService } from 'src/modules/profiles/profiles.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { BaseService } from 'src/core/utils/base-service';
import { UpdateRegularProfileDto } from '../dto/update-profile-regular.dto';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { ProfileModel } from 'src/modules/profiles/entities/profile.model';
import { UserCoursesProgressService } from 'src/modules/user-courses-progress/user-courses-progress.service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';
import { PasswordRecoveryRequestDto } from '../dto/password-recovery-request.dto';
import { RedisService } from 'src/modules/redis/redis.service';
import { SaveDatasetDto } from 'src/modules/redis/dto/save-dataset.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from 'src/modules/emails/email.service';
import { MailDto } from 'src/modules/emails/dto/mail.dto';
import { PasswordRecoveryResetDto } from '../dto/password-recovery-reset.dto';
import { GetDatasetDto } from 'src/modules/redis/dto/get-dataset.dto';
import { DeleteDatasetDto } from 'src/modules/redis/dto/delete-dataset.dto';
import { EMAIL_TEMPLATES_NAMES } from 'src/core/email/consts';
import { UserRycaServiceDto } from '../dto/user-ryca-service.dto';
import { ConsumeService } from 'src/modules/consume-service/consume-service.service';
import { RycaUserServiceResponseDto } from 'src/modules/consume-service/dto/ryca-user-service-response.dto';
import { MetricsService } from 'src/modules/metrics/metrics.service';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { RefreshTokenModel } from '../refresh-tokens/entities/refresh-token.model';

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
    private readonly redisService: RedisService,
    private readonly emailService: EmailService,
    private readonly consumeService: ConsumeService,
    private readonly metricsService: MetricsService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {
    super(RegularAuthService.name);
  }

  /**
   * @description Este método consume el servicio web de Ryca para obtener la información del estudiante, actualmente este método obtiene información dummy obtenida de un archivo XML que se encuentra en el repositorio, para la realización de pruebas deberá ser actualizado cuando se lleven a cabo las pruebas en el CUNOC
   * @param userRycaServiceDto Mapea los atributos necesarios para realizar la petición al servicio web de Ryca
   * @returns Información obtenida del servicio de RYCA
   */
  async getStudentInfo(userRycaServiceDto: UserRycaServiceDto) {
    const response = await this.consumeService.getExternalData(
      `https://ryca.cunoc.edu.gt/serviciosweb/servicecics.php?carne=${userRycaServiceDto.ra}&key=${process.env.RYCA_KEY}&pin=${userRycaServiceDto.pin}`,
    );
    return new RycaUserServiceResponseDto(
      await this.consumeService.parseXMLToJSON(response),
    );
  }

  /**
   * Creates a new profile with its user and logs the user in
   * @param {SignUpDto} Data to create the new profile with
   * @returns {Promise<object>} User, access_token and refresh_token
   */
  async signUp(
    signUpDto: SignUpDto,
    deviceInfo?: string,
    ipAddress?: string,
  ): Promise<{
    user: UserModel;
    access_token: string;
    refresh_token: string;
  }> {
    // Deconstruct the DTO
    const { user: createUserDto, ...profileDto } = signUpDto;

    // Save the profile and user
    return this.dbTrxService.databaseTransaction<{
      user: UserModel;
      access_token: string;
      refresh_token: string;
    }>(async (trx) => {
      // Check if some attributes are already in use
      const existant: UserModel | undefined =
        await this.usersService.findExistant(
          createUserDto.email,
          createUserDto.ra,
          createUserDto.username,
          trx,
        );

      const error: IGeneralError = {
        statusCode: 400,
        message: [],
        error: 'Bad Request',
      };

      if (existant) {
        if (existant.ra === createUserDto.ra) {
          (error.message as object[]).push({
            ra: 'Registro Académico ya en uso',
          });
        }
        if (existant.email === createUserDto.email) {
          (error.message as object[]).push({
            email: 'Correo electrónico ya en uso',
          });
        }
        if (existant.username === createUserDto.username) {
          (error.message as object[]).push({
            username: 'Nombre de usuario ya en uso',
          });
        }
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

      // Return the auth tokens
      const { access_token, refresh_token } = await this.generateTokenPair(
        createdUser,
        deviceInfo,
        ipAddress,
      );

      return { user: createdUser, access_token, refresh_token };
    }, this.logger);
  }

  /**
   * Creates a hash for the recovery of a user's password and sends it via email
   * @param {PasswordRecoveryRequestDto} passwordRecoveryRequest to create the hash and send the recovery request
   * @returns {Promise<object>} User and token
   */
  async passwordRecoveryRequest(
    passwordRecoveryRequest: PasswordRecoveryRequestDto,
  ): Promise<any> {
    const { email } = passwordRecoveryRequest;

    //Se verifica si el email ingresado existe
    const foundUser = await this.usersService.findByEmail(email);
    if (!foundUser) {
      throw new NotFoundException('El correo ingresado no esta registrado');
    }

    const randomHash = crypto.randomBytes(20).toString('hex');

    //Store recovery key and email on Redis
    const saveDatasetDto = new SaveDatasetDto();
    saveDatasetDto.prefix = 'PWRC';
    saveDatasetDto.key = randomHash;
    saveDatasetDto.value = email;

    await this.redisService.saveDataset(saveDatasetDto);

    //Send mail to user
    const emailDto = new MailDto();
    emailDto.to = email;
    emailDto.subject = 'Recuperacion de Contraseña CICS-App';
    emailDto.template = EMAIL_TEMPLATES_NAMES.RECOVERY_PASSWORD;
    emailDto.context = {
      frontend_url: process.env.FRONTEND_HOST_URL,
      token: randomHash,
    };

    await this.emailService.sendMail(emailDto);
  }

  /**
   * Resets the password of a user to recover it
   * @param {PasswordRecoveryResetDto} passwordRecoveryReset to create the hash and send the recovery request
   * @returns {Promise<object>} User and token
   */
  async passwordRecoveryReset(
    passwordRecoveryReset: PasswordRecoveryResetDto,
  ): Promise<any> {
    const { hash, new_password } = passwordRecoveryReset;

    //Get the email associated  with the hash
    const getDatasetDto = new GetDatasetDto();
    getDatasetDto.prefix = 'PWRC';
    getDatasetDto.key = hash;

    //Verifies if the has is valid
    const foundEmail = await this.redisService.getDataset(getDatasetDto);
    if (!foundEmail) {
      throw new NotFoundException('El hash ingresado no es valido');
    }

    //Verifies if the email exists on the system
    const foundUser = await this.usersService.findByEmail(foundEmail);
    if (!foundUser) {
      throw new NotFoundException('El email ingresado no esta registrado');
    }

    //The password of the user is changed
    this.usersService
      .updatePassword(foundUser.id, new_password)
      .then(async () => {
        //Lastly the hash is erased from Redis
        const deleteDatasetDto = new DeleteDatasetDto();
        deleteDatasetDto.prefix = 'PWRC';
        deleteDatasetDto.key = hash;
        await this.redisService.deleteDataset(deleteDatasetDto);
      });
    //The operation was successfull
  }

  /**
   * Generates access and refresh tokens for the user and returns them along with the user
   * @param user User to generate tokens for
   * @param deviceInfo Optional device info from User-Agent header
   * @param ipAddress Optional IP address
   */
  async login(user: UserModel, deviceInfo?: string, ipAddress?: string) {
    const { access_token, refresh_token } = await this.generateTokenPair(
      user,
      deviceInfo,
      ipAddress,
    );
    return { user, access_token, refresh_token };
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
    const user = await this.usersService.findAndReturnById(record.entity_id);

    // Rotate: revoke old token, issue new pair
    await this.refreshTokensService.revoke(rawRefreshToken);
    return this.generateTokenPair(user, deviceInfo, ipAddress);
  }

  /**
   * Revokes the given refresh token (logout current session)
   * @param rawRefreshToken Opaque refresh token to invalidate
   */
  async logout(rawRefreshToken: string): Promise<void> {
    await this.refreshTokensService.revoke(rawRefreshToken);
  }

  /**
   * Revokes all refresh tokens for the user (logout all sessions)
   * @param userId ID of the user
   */
  async logoutAll(userId: number): Promise<void> {
    await this.refreshTokensService.revokeAll('user', userId);
  }

  /**
   * Returns all active sessions for the user
   * @param userId ID of the user
   */
  async listSessions(userId: number): Promise<RefreshTokenModel[]> {
    return this.refreshTokensService.listActive('user', userId);
  }

  /**
   * Revokes a specific session by its ID, ensuring it belongs to the user
   * @param sessionId ID of the refresh_token record
   * @param userId ID of the authenticated user
   */
  async revokeSession(sessionId: number, userId: number): Promise<void> {
    await this.refreshTokensService.revokeById(sessionId, 'user', userId);
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
      const result = match ? user : undefined;
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
    user: UserModel,
    deviceInfo?: string,
    ipAddress?: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const jti = crypto.randomUUID();
    const payload = { sub: user.id, type: 'user', jti };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
    const refresh_token = await this.refreshTokensService.create(
      'user',
      user.id,
      deviceInfo ?? null,
      ipAddress ?? null,
      jti,
    );
    return { access_token, refresh_token };
  }
}
