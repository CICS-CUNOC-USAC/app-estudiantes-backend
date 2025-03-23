import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class PasswordRecoveryResetDto {
  @ApiProperty({
    type: String,
    example: 'hash',
    description: 'Hash to validate the reset',
    required: true,
    maxLength: 40,
  })
  @IsNotEmpty()
  @Length(40, 40)
  readonly hash: string;

  @ApiProperty({
    type: String,
    example: 'password',
    description: 'Password for reset',
    required: true,
    maxLength: 100,
  })
  @IsNotEmpty()
  @MaxLength(100)
  readonly new_password: string;
}
