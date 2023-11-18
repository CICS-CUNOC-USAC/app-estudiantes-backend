import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { UpdateRegularUserDto } from './update-user-regular.dto';

export class UpdateRegularProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'The first name of the user',
    example: 'Juan',
  })
  readonly first_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: 'The last name of the user',
    example: 'De la Cruz',
  })
  readonly last_name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateRegularUserDto)
  @ApiProperty({
    description: 'User information related to the profile',
  })
  readonly user: UpdateRegularUserDto;
}
