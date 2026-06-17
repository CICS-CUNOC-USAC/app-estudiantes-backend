import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePrerequisiteDto {
  @ApiProperty({ example: true, description: 'Whether the prerequisite is a course (true) or credits (false)' })
  @IsBoolean()
  isCourse: boolean;

  @ApiProperty({ example: '169', description: 'Code of the prerequisite course (required if isCourse=true)', required: false })
  @IsString()
  @IsOptional()
  prerequisiteCourseCode?: string;

  @ApiProperty({ example: 30, description: 'Minimum credits required (required if isCourse=false)', required: false })
  @IsInt()
  @IsOptional()
  credits?: number;
}
