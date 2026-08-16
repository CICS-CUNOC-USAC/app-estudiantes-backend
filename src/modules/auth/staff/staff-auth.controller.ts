import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { StaffAuthService } from './staff-auth.service';
import { LoginDto } from '../dto/login.dto';
import { StaffLoginLocalAuthGuard } from 'src/core/guards/local-staff-auth.guard';
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@ApiTags('Staff Login')
@Controller('staff-auth')
export class StaffAuthController {
  constructor(private readonly staffAuthService: StaffAuthService) {}

  @UseGuards(StaffLoginLocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { staff, access_token, refresh_token } =
      await this.staffAuthService.login(
        req.user,
        req.headers['user-agent'],
        req.ip,
      );
    return res
      .set({ Authorization: `Bearer ${access_token}` })
      .send({ staff, access_token, refresh_token });
  }

  @Post('refresh')
  async refresh(
    @Body(new ValidationPipe()) body: RefreshTokenDto,
    @Request() req,
  ) {
    return this.staffAuthService.refresh(
      body.refresh_token,
      req.headers['user-agent'],
      req.ip,
    );
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Post('logout')
  async logout(@Body(new ValidationPipe()) body: RefreshTokenDto) {
    await this.staffAuthService.logout(body.refresh_token);
    return { message: 'Sesión cerrada exitosamente' };
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Post('logout-all')
  async logoutAll(@Request() req) {
    await this.staffAuthService.logoutAll(req.user.id);
    return { message: 'Todas las sesiones cerradas exitosamente' };
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('sessions')
  async sessions(@Request() req) {
    return this.staffAuthService.listSessions(req.user.id);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Delete('sessions/:id')
  async revokeSession(@Param('id') id: string, @Request() req) {
    await this.staffAuthService.revokeSession(+id, req.user.id);
    return { message: 'Sesión cerrada exitosamente' };
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.staffAuthService.myProfile(req.user);
  }
}
