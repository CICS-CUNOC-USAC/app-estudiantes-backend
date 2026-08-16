import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegularAuthService } from './regular-auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegularLoginLocalAuthGuard } from 'src/core/guards/local-regular-auth.guard';
import { RegularLoginJwtAuthGuard } from 'src/core/guards/jwt-regular-auth.guard';
import { SignUpDto } from '../dto/sign-up.dto';
import { UpdateRegularProfileDto } from '../dto/update-profile-regular.dto';
import { PasswordRecoveryRequestDto } from '../dto/password-recovery-request.dto';
import { PasswordRecoveryResetDto } from '../dto/password-recovery-reset.dto';
import { UserRycaServiceDto } from '../dto/user-ryca-service.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@ApiTags('Regular Login')
@Controller('auth')
export class RegularAuthController {

  constructor(private readonly regularAuthService: RegularAuthService) { }


  @Post('sign-up')
  async create(
    @Body(new ValidationPipe({ transform: true })) signUpDto: SignUpDto,
    @Request() req,
    @Response() res,
  ) {
    const response = await this.regularAuthService.signUp(
      signUpDto,
      req.headers['user-agent'],
      req.ip,
    );
    const { access_token, refresh_token, user } = response;
    return res
      .set({ Authorization: `Bearer ${access_token}` })
      .send({ user, access_token, refresh_token });
  }

  @Get('student-info')
  async getStudentInfo(
    @Query(new ValidationPipe({ transform: true }))
    userRycaServiceDto: UserRycaServiceDto,
  ) {
    return this.regularAuthService.getStudentInfo(userRycaServiceDto);
  }

  @Post('password-recovery')
  async passwordRecovery(
    @Body(new ValidationPipe({ transform: true }))
    passwordRecoveryRequestDto: PasswordRecoveryRequestDto,
    @Response() res,
  ) {
    await this.regularAuthService.passwordRecoveryRequest(
      passwordRecoveryRequestDto,
    );
    return res.set().send({ message: 'Envio exitoso' });
  }

  @Post('password-reset')
  async passwordReset(
    @Body(new ValidationPipe({ transform: true }))
    passwordRecoveryResetDto: PasswordRecoveryResetDto,
    @Response() res,
  ) {
    await this.regularAuthService.passwordRecoveryReset(
      passwordRecoveryResetDto,
    );
    return res.set().send({ message: 'Reset exitoso' });
  }

  @UseGuards(RegularLoginLocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { user, access_token, refresh_token } =
      await this.regularAuthService.login(
        req.user,
        req.headers['user-agent'],
        req.ip,
      );
    return res
      .set({ Authorization: `Bearer ${access_token}` })
      .send({ user, access_token, refresh_token });
  }

  @Post('refresh')
  async refresh(
    @Body(new ValidationPipe()) body: RefreshTokenDto,
    @Request() req,
  ) {
    return this.regularAuthService.refresh(
      body.refresh_token,
      req.headers['user-agent'],
      req.ip,
    );
  }

  @UseGuards(RegularLoginJwtAuthGuard)
  @Post('logout')
  async logout(@Body(new ValidationPipe()) body: RefreshTokenDto) {
    await this.regularAuthService.logout(body.refresh_token);
    return { message: 'Sesión cerrada exitosamente' };
  }

  @UseGuards(RegularLoginJwtAuthGuard)
  @Post('logout-all')
  async logoutAll(@Request() req) {
    await this.regularAuthService.logoutAll(req.user.id);
    return { message: 'Todas las sesiones cerradas exitosamente' };
  }

  @UseGuards(RegularLoginJwtAuthGuard)
  @Get('sessions')
  async sessions(@Request() req) {
    return this.regularAuthService.listSessions(req.user.id);
  }

  @UseGuards(RegularLoginJwtAuthGuard)
  @Delete('sessions/:id')
  async revokeSession(@Param('id') id: string, @Request() req) {
    await this.regularAuthService.revokeSession(+id, req.user.id);
    return { message: 'Sesión cerrada exitosamente' };
  }

  @UseGuards(RegularLoginJwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.regularAuthService.myProfile(req.user);
  }

  @UseGuards(RegularLoginJwtAuthGuard)
  @Put('me')
  async updateProfile(
    @Request() req,
    @Body(new ValidationPipe({ transform: true }))
    body: UpdateRegularProfileDto,
  ) {
    return this.regularAuthService.update(
      req.user['id'],
      req.user['profile_id'],
      body,
    );
  }
}
