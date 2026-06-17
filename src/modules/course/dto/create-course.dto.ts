import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: '2804', description: 'Code of the course' })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Introduccion a la Programacion y Computacion 1',
    description: 'Name of the course',
  })
  @IsString()
  @MaxLength(350)
  name: string;

  @ApiProperty({ example: '', description: 'Description of the course' })
  @IsString()
  description: string;

  @ApiProperty({ example: 3, description: 'Credits given by the course' })
  @IsInt()
  credits: number;
}
