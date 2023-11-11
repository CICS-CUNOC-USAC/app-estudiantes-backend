import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

export class MediaQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  @ApiProperty({
    description: 'Path in which files are saved in S3',
    example: 'manuals',
  })
  path?: string;
}
