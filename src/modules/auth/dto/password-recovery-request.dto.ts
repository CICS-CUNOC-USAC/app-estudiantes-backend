import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class PasswordRecoveryRequestDto {
  @ApiProperty({
    type: String,
    example: 'email@test.com',
    description: 'Email for password recovery',
    required: true,
    maxLength: 255,
  })
  @IsNotEmpty()
  @MaxLength(255)
  readonly email: string;
}
