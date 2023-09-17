import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RegularAuthService } from './regular-auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegularLoginLocalAuthGuard } from 'src/core/guards/local-regular-auth.guard';
import { RegularLoginJwtAuthGuard } from 'src/core/guards/jwt-regular-auth.guard';
import { SignUpDto } from '../dto/sign-up.dto';

@ApiTags('regular login')
@Controller('auth')
export class RegularAuthController {
  constructor(private readonly regularAuthService: RegularAuthService) {}

  @Post('sign-up')
  async create(@Body() signUpDto: SignUpDto, @Response() res) {
    const response = await this.regularAuthService.signUp(signUpDto);
    const token = response['token'];
    const user = response['user'];
    return res.set({ Authorization: `Bearer ${token}` }).send({ user, token });
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
}
