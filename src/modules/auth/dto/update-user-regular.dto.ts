import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateRegularUserDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  @MaxLength(320)
  @ApiProperty({
    description: 'Email to use for sign in',
    example: 'juan@email.com',
  })
  readonly email?: string;

  @IsOptional()
  @IsNumberString()
  @MaxLength(20)
  @ApiProperty({
    description: 'RA (Registro academico) related to the user',
    example: '202131249',
  })
  readonly ra?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'Password to use for sign in',
    example: 'password',
  })
  readonly password?: string;
}
