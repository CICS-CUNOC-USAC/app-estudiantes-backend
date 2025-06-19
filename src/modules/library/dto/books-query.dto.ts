import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

export class BooksQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'Name of the book',
    example: 'Fisica Universitaria 2',
  })
  name?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'Name of the author of the book',
    example: 'James Stewart',
  })
  author?: string | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'ID of the Category of the book',
    example: '2',
  })
  category_id?: number | null;
}
