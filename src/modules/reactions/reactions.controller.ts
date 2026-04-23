import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
import { OptionalRegularLoginJwtAuthGuard } from 'src/core/guards/jwt-regular-optional-auth.guard';
import { RegularLoginJwtAuthGuard } from 'src/core/guards/jwt-regular-auth.guard';
import { ThrottlerUserGuard } from 'src/core/guards/throttler-user.guard';
import { ToggleReactionDto } from './dto/toggle-reaction.dto';
import { ReactionsService } from './reactions.service';

@ApiTags('Reactions')
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @UseGuards(OptionalRegularLoginJwtAuthGuard)
  @Get(':strapiPostId')
  getByPost(@Param('strapiPostId') strapiPostId: string, @Req() req: Request) {
    const userId = req.user ? +req.user['id'] : undefined;
    return this.reactionsService.getByPost(strapiPostId, userId);
  }

  @UseGuards(RegularLoginJwtAuthGuard, ThrottlerUserGuard)
  @Throttle({
    default: {
      limit: 20,
      ttl: 60000,
    },
  })
  @Post('toggle')
  toggle(
    @Req() req: Request,
    @Body(new ValidationPipe({ transform: true }))
    toggleReactionDto: ToggleReactionDto,
  ) {
    return this.reactionsService.toggle(+req.user['id'], toggleReactionDto);
  }
}
