import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { RegularLoginJwtAuthGuard } from 'src/core/guards/jwt-regular-auth.guard';
import { AchievementsService, ProcessResult } from './achievements.service';

@ApiTags('Achievements')
@UseGuards(RegularLoginJwtAuthGuard)
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post('certificate')
  @ApiOperation({
    summary: 'Procesa certificacion PDF y asigna logros al usuario autenticado',
  })
  @UseInterceptors(
    FileInterceptor('certificate', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['certificate'],
      properties: {
        certificate: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async processCertificate(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProcessResult> {
    if (!file) {
      throw new BadRequestException('Debes adjuntar un archivo PDF');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('El archivo debe ser de tipo PDF');
    }

    return this.achievementsService.processUserCertificate(
      +req.user['id'],
      file.buffer,
    );
  }

  @Get('me')
  @ApiOperation({ summary: 'Obtiene los logros ganados del usuario autenticado' })
  getMyAchievements(@Request() req) {
    return this.achievementsService.getMyAchievements(+req.user['id']);
  }
}