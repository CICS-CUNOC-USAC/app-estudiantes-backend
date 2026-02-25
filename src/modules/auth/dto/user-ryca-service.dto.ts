import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRycaServiceDto {
  @IsNumberString()
  @MaxLength(20)
  @ApiProperty({
    description: 'RA (Registro academico) relacionado al usuario',
    example: '202131249',
  })
  readonly ra?: string;

  @IsString()
  @MinLength(7)
  @ApiProperty({
    description: 'Pin utilizado para iniciar sesión con el servicio de Ryca',
    example: 'CIC1234',
  })
  readonly pin?: string;
}
