import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { StaffAuthService } from './staff-auth.service';
import { LoginDto } from '../dto/login.dto';
import { StaffLoginLocalAuthGuard } from 'src/core/guards/local-staff-auth.guard';
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';

@ApiTags('staff login')
@Controller('staff-auth')
export class StaffAuthController {
  constructor(private readonly staffAuthService: StaffAuthService) {}

  @UseGuards(StaffLoginLocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { staff, token } = await this.staffAuthService.login(req.user);
    return res.set({ Authorization: `Bearer ${token}` }).send({ staff, token });
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.staffAuthService.myProfile(req.user);
  }
}
