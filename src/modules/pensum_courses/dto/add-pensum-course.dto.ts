import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString, MaxLength, Min } from 'class-validator';

export class AddPensumCourseDto {
  @ApiProperty({ example: '9999', description: 'Unique code for the new course' })
  @IsString()
  courseCode: string;

  @ApiProperty({ example: 'New Course', description: 'Name of the course' })
  @IsString()
  @MaxLength(350)
  courseName: string;

  @ApiProperty({ example: 'Course description', description: 'Description of the course' })
  @IsString()
  courseDescription: string;

  @ApiProperty({ example: 3, description: 'Credits given by the course' })
  @IsInt()
  @Min(1)
  courseCredits: number;

  @ApiProperty({ example: 2, description: 'Semester number in the pensum' })
  @IsInt()
  @Min(1)
  semester: number;

  @ApiProperty({ example: 1, description: 'Field number (must match career_fields)' })
  @IsInt()
  field: number;

  @ApiProperty({ example: true, description: 'Whether the course is mandatory' })
  @IsBoolean()
  mandatory: boolean;
}
