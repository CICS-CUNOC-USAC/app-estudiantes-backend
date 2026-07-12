import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdatePensumCourseDto {
  @ApiPropertyOptional({ example: 'Updated Course', description: 'Name of the course' })
  @IsOptional()
  @IsString()
  @MaxLength(350)
  courseName?: string;

  @ApiPropertyOptional({ example: 'Updated description', description: 'Description of the course' })
  @IsOptional()
  @IsString()
  courseDescription?: string;

  @ApiPropertyOptional({ example: 4, description: 'Credits given by the course' })
  @IsOptional()
  @IsInt()
  @Min(1)
  courseCredits?: number;

  @ApiPropertyOptional({ example: 2, description: 'Semester number in the pensum' })
  @IsOptional()
  @IsInt()
  @Min(1)
  semester?: number;

  @ApiPropertyOptional({ example: 1, description: 'Field number (must match career_fields)' })
  @IsOptional()
  @IsInt()
  field?: number;

  @ApiPropertyOptional({ example: true, description: 'Whether the course is mandatory' })
  @IsOptional()
  @IsBoolean()
  mandatory?: boolean;
}
