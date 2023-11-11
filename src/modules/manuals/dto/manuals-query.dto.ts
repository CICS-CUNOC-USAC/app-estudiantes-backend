import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

export class ManualsQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'Name of the manual',
    example: 'A Manual X',
  })
  name?: string | null;
}
