import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ClonePensumDto {
  @ApiProperty({ example: 6, description: 'ID of the source pensum to clone from' })
  @IsInt()
  sourcePensumId: number;

  @ApiProperty({ example: 2025, description: 'Year for the new pensum' })
  @IsInt()
  year: number;
}
