import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreatePensumDto {
  @ApiProperty({ example: 58, description: 'Code of the career' })
  @IsInt()
  career_code: number;

  @ApiProperty({ example: 2020, description: 'Year of the pensum' })
  @IsInt()
  year: number;

  @ApiProperty({
    example: false,
    description: 'Whether the pensum is active',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
