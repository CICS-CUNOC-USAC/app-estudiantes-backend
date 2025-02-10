import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class DigitalBookDto {
  //Digital book fields
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
