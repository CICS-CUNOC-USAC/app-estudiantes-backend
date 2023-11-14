import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class BaseQueryDto {
  @IsOptional()
  @ApiProperty({
    description: 'Limit of entries per page. Number should be positive.',
    example: 10,
  })
  limit?: number | string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsPositive()
  @ApiProperty({
    description: 'Page to return. Number should be positive.',
    example: 1,
  })
  page?: number | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `String that indicates how to order the entries. Formated the 
      following way: name of the attribute to order by as a string, following by a colon, 
      and then a string with the order value ('asc' | 'desc' | 'ASC' | 'DESC')
      and then a comma to be followed by other attributes`,
    example: 'created_at:desc,updated_at:asc',
  })
  orderBy?: string | null;
}
