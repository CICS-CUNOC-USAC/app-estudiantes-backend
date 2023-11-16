import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLibraryDto } from './create-library.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLibraryDto extends PartialType(CreateLibraryDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The name of the book',
    example: 'Termodinamica 3',
  })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of the author of the book',
    example: 'Dennis G. Zill',
  })
  readonly author?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The description of the book resource',
    example: 'Libro acerca de termodinamica volumen 3',
  })
  readonly description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'External url to the book (used for reference to original source)',
    example: 'https://www.googleacademico.com/termodinamica3-dgz.pdf',
  })
  readonly source_url?: string;
}
