import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePhysicalBookDto } from './create-physical-book.dto';

export class CreateReferenceDto extends PartialType(CreatePhysicalBookDto) {
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
