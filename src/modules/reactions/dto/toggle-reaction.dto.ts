import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ReactionType } from '../entities/reaction.model';

export class ToggleReactionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the post in Strapi',
    example: '123',
  })
  readonly strapiPostId: string;

  @IsEnum(ReactionType)
  @ApiProperty({
    description: 'Reaction type to toggle',
    enum: ReactionType,
    example: ReactionType.LIKE,
  })
  readonly type: ReactionType;
}
