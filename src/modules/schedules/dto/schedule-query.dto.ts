import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

export class ScheduleQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'A selection of the ids specific periods',
    example: '[1,2], [3], [2,7]',
  })
  selection?: number[] | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The code of a specific career',
    example: '33, 58',
  })
  career?: number | null;
}
