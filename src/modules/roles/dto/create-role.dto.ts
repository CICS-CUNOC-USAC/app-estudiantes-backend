import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the role',
    example: 'Superadmin',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Alias of the role',
    example: 'superadmin',
  })
  readonly alias: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The description of the role',
    example: 'This is the superadministrator',
  })
  readonly description: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'An array of ids of permissions to assign to the role',
    example: '[ 1, 3, 6, 12 ]',
  })
  readonly permissions_ids: number[];
}
