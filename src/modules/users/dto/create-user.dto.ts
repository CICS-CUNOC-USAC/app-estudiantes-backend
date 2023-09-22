import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(320)
  @ApiProperty({
    description: 'Email to use for sign in',
    example: 'juan@email.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(20)
  @ApiProperty({
    description: 'RA (Registro acadêmico) related to the user',
    example: '202131249',
  })
  readonly ra: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'Password to use for sign in',
    example: 'password',
  })
  readonly password: string;
}
