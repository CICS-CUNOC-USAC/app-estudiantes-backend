import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMediaDto } from 'src/modules/media/dto/create-media.dto';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the article',
    example: 'Uso de las Metodologias Agiles',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Description of the article',
    example:
      'El articulo habla acerca de los nuevos usos de las Metodologias agiles',
  })
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Category ID for categorization of the article',
    example: 2,
  })
  readonly category_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Staff ID of the author of the article',
    example: 1,
  })
  readonly staff_id: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateMediaDto)
  @ApiProperty({
    description: 'User information related to the profile',
  })
  readonly media: CreateMediaDto;
}
