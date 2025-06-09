import {
  Body,
  Controller,
  Get,
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

@ApiTags('Regular Login')
@Controller('auth')
export class RegularAuthController {
  constructor(private readonly regularAuthService: RegularAuthService) {}

  @Post('sign-up')
  async create(
    @Body(new ValidationPipe({ transform: true })) signUpDto: SignUpDto,
    @Response() res,
  ) {
    const response = await this.regularAuthService.signUp(signUpDto);
    const token = response['token'];
    const user = response['user'];
    return res.set({ Authorization: `Bearer ${token}` }).send({ user, token });
  }

  @Get('student-info')
  async getStudentInfo(@Query(new ValidationPipe({ transform: true })) userRycaServiceDto: UserRycaServiceDto) {
    return this.regularAuthService.getStudentInfo(userRycaServiceDto);
  }

  @Post('password-recovery')
  async passwordRecovery(
    @Body(new ValidationPipe({ transform: true }))
    passwordRecoveryRequestDto: PasswordRecoveryRequestDto,
    @Response() res,
  ) {
    const response = await this.regularAuthService.passwordRecoveryRequest(
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
    const response = await this.regularAuthService.passwordRecoveryReset(
      passwordRecoveryResetDto,
    );
    return res.set().send({ message: 'Reset exitoso' });
  }

  @UseGuards(RegularLoginLocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { user, token } = await this.regularAuthService.login(req.user);
    return res.set({ Authorization: `Bearer ${token}` }).send({ user, token });
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
    // return this.regularAuthService.updateProfile(req.user, body);
  }
}
