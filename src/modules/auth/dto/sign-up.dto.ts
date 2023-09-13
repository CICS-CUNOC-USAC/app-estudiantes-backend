import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'The first name of the user',
    example: 'Juan',
  })
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'The last name of the user',
    example: 'De la Cruz',
  })
  readonly last_name: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  @ApiProperty({
    description: 'User information related to the profile',
  })
  readonly user: CreateUserDto;
}
