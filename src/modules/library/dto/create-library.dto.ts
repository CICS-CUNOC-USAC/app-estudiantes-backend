import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateLibraryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the book',
    example: 'Termodinamica 2',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    description: 'The ISBN code of the book',
    example: '4594839543',
  })
  readonly isbn: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the author of the book',
    example: 'James Stewart',
  })
  readonly author: string;

  @IsString()
  @ApiProperty({
    description: 'The description of the book resource',
    example: 'Libro acerca de termodinamica',
  })
  readonly description: string;
}
