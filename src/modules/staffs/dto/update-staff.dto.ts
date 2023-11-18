import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto';
import { IsEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateStaffDto extends PartialType(
  OmitType(CreateStaffDto, ['password'] as const),
) {
  @IsString()
  @IsEmpty()
  @MaxLength(20)
  @ApiProperty({
    description: 'Password of the staff',
    minLength: 8,
    maxLength: 20,
    required: true,
  })
  password?: string;
}
