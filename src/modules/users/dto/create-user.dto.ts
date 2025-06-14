import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
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
  @IsString()
  @MaxLength(320)
  @ApiProperty({
    description: 'Username that represents the user',
    example: 'juanfra02',
  })
  readonly username: string;

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

  @IsNotEmpty()
  @IsNumber()
  @IsIn([33, 34, 35, 36, 58])
  @ApiProperty({
    description: 'Career code related to the user',
    example: 38,
  })
  readonly career_code: number;
}
