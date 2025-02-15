import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

export class HourQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'A selection of specific periods',
    example: '12:10-13:00, 13:40-14:30',
  })
  selection?: string[] | null;
}
