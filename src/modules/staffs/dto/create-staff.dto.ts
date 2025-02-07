import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty({
    description: 'First name of the staff',
    maxLength: 100,
    required: true,
  })
  first_name: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Last name of the staff',
    maxLength: 100,
    required: true,
  })
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the staff',
    required: true,
  })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of the staff',
    minLength: 8,
    maxLength: 20,
    required: true,
  })
  password: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'An array of ids of roles to assign to the staff',
    example: '[ 1, 3, 6, 12 ]',
  })
  readonly roles_ids: number[];
}
