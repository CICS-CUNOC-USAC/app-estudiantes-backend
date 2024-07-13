import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ValidationPipe,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGeneralRequiredAuthGuard } from 'src/core/guards/jwt-general-required-auth.guard';
import { MediaQueryDto } from './dto/media-query.dto';
import { GeneralAuthInterceptor } from 'src/core/interceptors/auth/regular-auth.interceptor';
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';

@UseGuards(JwtGeneralRequiredAuthGuard)
@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          example: 'manuals',
          description:
            "Path in which to save the file. If the file name is 'test.pdf' and the path is 'articles', the image will be saved in the path 'articles/test.pdf' in S3. If not provided, the file will be saved in the root of the bucket '/nocat'",
        },
        attach_type: {
          type: 'string',
          examples: ['manual', 'article'],
          description:
            "Type of attachment. If the file is a manual, the value should be 'manual'. If the file is an article, the value should be 'article'. Used later to validate file types for future updates.",
        },
        file: {
          type: 'file',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    },
  })
  create(
    @Body(new ValidationPipe({ transform: true }))
    createMediaDto: CreateMediaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.mediaService.create(file, createMediaDto);
  }

  @UseGuards(StaffLoginJwtAuthGuard)
  @Get('admin')
  findAllAdmin(@Query() queryDto: MediaQueryDto) {
    return this.mediaService.findAllAdmin(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          example: 'manuals',
          description:
            "Path in which to save the new file. If the file name is 'test.pdf' and the path is 'articles', the image will be saved in the path 'articles/test.pdf' in S3. If not provided, the file will be saved in the root of the bucket '/nocat'",
        },
        file: {
          type: 'file',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    console.log(file);
    return this.mediaService.update(+id, file, updateMediaDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mediaService.remove(+id);
  // }
}
