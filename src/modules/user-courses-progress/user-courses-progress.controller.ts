import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { UserCoursesProgressService } from './user-courses-progress.service';
import { CreateUserCoursesProgressDto } from './dto/create-user-courses-progress.dto';
import { UpdateUserCoursesProgressDto } from './dto/update-user-courses-progress.dto';
import { JwtGeneralRequiredAuthGuard } from 'src/core/guards/jwt-general-required-auth.guard';
import { GeneralAuthInterceptor } from 'src/core/interceptors/auth/regular-auth.interceptor';

@UseGuards(JwtGeneralRequiredAuthGuard)
@UseInterceptors(GeneralAuthInterceptor)
@Controller('user-courses-progress')
export class UserCoursesProgressController {
  constructor(
    private readonly userCoursesProgressService: UserCoursesProgressService,
  ) {}

  @Post()
  create(@Request() req) {
    return this.userCoursesProgressService.create(
      req.user['id'],
      req.user['career_code'],
    );
  }

  @Get()
  findUserProgress(@Request() req) {
    return this.userCoursesProgressService.findUserProgress(
      req.user['id'],
      req.user['career_code'],
    );
  }

  // @Get(':userId')
  // findOne(@Param('userId') id: string) {
  //   return this.userCoursesProgressService.findOne(+id);
  // }

  @Patch(':careerProgressId')
  update(
    @Body(new ValidationPipe({ transform: true }))
    updateUserCoursesProgressDto: UpdateUserCoursesProgressDto,
    @Request() req,
    @Param('careerProgressId') careerProgressId: number,
  ) {
    return this.userCoursesProgressService.update(
      updateUserCoursesProgressDto,
      +careerProgressId,
      req.user['id'],
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCoursesProgressService.remove(+id);
  }
}
