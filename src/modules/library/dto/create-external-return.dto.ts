import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateExternalReturnDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'ID of the loan to be returned',
    example: '2',
  })
  readonly loan_id: number;

  @IsString()
  @ApiProperty({
    description: 'ID of the library reference of the book',
    example: 'M434',
  })
  readonly library_reference_id: string;
}
