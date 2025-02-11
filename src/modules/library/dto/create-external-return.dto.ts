import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateExternalReturnDto {
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

  @IsString()
  @ApiProperty({
    description: 'ID of the library reference of the book',
    example: 'M434',
  })
  readonly library_reference_id: string;
}
