import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  @Matches(/\S/, {
    message: 'El comentario no puede contener solo espacios',
  })
  @ApiProperty({
    description: 'Text content of the comment',
    example: 'Excelente post',
  })
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the post in Strapi',
    example: '123',
  })
  readonly strapiPostId: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: 'Parent comment ID. Null/undefined means root comment',
    example: 1,
  })
  readonly parentId?: number;
}
