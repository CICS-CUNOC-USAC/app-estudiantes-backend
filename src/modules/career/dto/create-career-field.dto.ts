import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCareerFieldDto {
  @ApiProperty({ example: 6, description: 'Field number within the career' })
  @IsInt()
  fieldNumber: number;

  @ApiProperty({ example: 'Area de Computacion', description: 'Name of the field' })
  @IsString()
  @MaxLength(320)
  name: string;

  @ApiProperty({ example: false, description: 'Whether the field is shared across careers', required: false })
  @IsBoolean()
  @IsOptional()
  commonField?: boolean;
}
