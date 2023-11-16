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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the author of the book',
    example: 'James Stewart',
  })
  readonly author: string;

  @IsString()
  @ApiProperty({
    description: 'The description of the manual',
    example: 'This is a manual',
  })
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description:
      'External url to the book (used for reference to original source)',
    example: 'https://www.googleacademico.com/termodinamica2-jamesstw.pdf',
  })
  readonly source_url: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The id of the media entity to attach to the book entity',
    example: 12,
  })
  readonly media_id: number;
}
