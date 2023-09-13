import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: 'email@test.com',
    description: 'Email for login',
    required: true,
    maxLength: 255,
  })
  @IsNotEmpty()
  @MaxLength(255)
  readonly email: string;

  @ApiProperty({
    type: String,
    example: 'password',
    description: 'Password for login',
    required: true,
    maxLength: 100,
  })
  @IsNotEmpty()
  @MaxLength(100)
  readonly password: string;
}
