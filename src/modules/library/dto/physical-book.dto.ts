import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
  IsBoolean,
} from 'class-validator';

export class PhysicalBookDto {
  //Physical book fields
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The id of the book at the library it is',
    example: 'MD423',
  })
  readonly reference_id: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'If the book is available for lending',
    example: true,
  })
  readonly is_available: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The edition of the book',
    example: 'Primera Edicion',
  })
  readonly edition: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The physical location of the book at the library',
    example: 'Estante 2, Repisa 5',
  })
  readonly location: string;
}
