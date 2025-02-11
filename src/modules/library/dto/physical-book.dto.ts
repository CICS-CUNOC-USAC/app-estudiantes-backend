import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
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
  @IsNumber()
  @ApiProperty({
    description: 'The number of existing units of the book',
    example: 6,
  })
  readonly total_availability: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The number of available units of the book for lending',
    example: 6,
  })
  readonly current_availability: number;

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
