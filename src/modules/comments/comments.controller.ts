import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { RegularLoginJwtAuthGuard } from 'src/core/guards/jwt-regular-auth.guard';
import { ThrottlerUserGuard } from 'src/core/guards/throttler-user.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':strapiPostId')
  findByPost(@Param('strapiPostId') strapiPostId: string) {
    return this.commentsService.findByPost(strapiPostId);
  }

  @UseGuards(RegularLoginJwtAuthGuard, ThrottlerUserGuard)
  @Throttle({
    default: {
      limit: 5,
      ttl: 60000,
    },
  })
  @Post()
  create(
    @Request() req,
    @Body(new ValidationPipe({ transform: true }))
    createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(req.user['id'], createCommentDto);
  }

  @UseGuards(RegularLoginJwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.commentsService.delete(+id, req.user['id']);
  }
}
