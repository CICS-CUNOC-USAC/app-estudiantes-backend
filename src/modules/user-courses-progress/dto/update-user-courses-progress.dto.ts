import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserCoursesProgressDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "Id of the user's course semester progress to update",
    type: Number,
  })
  course_semester_progress_id: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The approved state of the course to set',
    type: Boolean,
  })
  approved: boolean;
}
