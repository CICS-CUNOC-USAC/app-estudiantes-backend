import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

export class ScheduleQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: 'A selection of the ids specific periods',
    example: '1, 3, 7',
  })
  selection?: number[] | null;
}
