import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateExternalLoanDto {
  @IsString()
  @ApiProperty({
    description: 'RA of the student loaning the book',
    example: '202010101',
  })
  readonly ra: string;

  @IsString()
  @ApiProperty({
    description: 'Personal ID of the student loaning the book',
    example: '1234567890901',
  })
  readonly personal_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Place of the book loan',
    example: '1 Avenida 1-11 Zona 1, Quetzaltenango',
  })
  readonly place: string;
}
