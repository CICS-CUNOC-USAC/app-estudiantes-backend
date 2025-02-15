import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto';
import {
  IsEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateStaffDto extends PartialType(
  OmitType(CreateStaffDto, ['password'] as const),
) {
  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({
    description: 'Password of the staff',
    minLength: 8,
    maxLength: 20,
    required: false,
  })
  password?: string;
}
