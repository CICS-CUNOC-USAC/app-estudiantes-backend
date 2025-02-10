import { IntersectionType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CreateLibraryDto } from './create-library.dto';
import { PhysicalBookDto } from './physical-book.dto';

export class CreatePhysicalBookDto extends IntersectionType(
  CreateLibraryDto,
  PhysicalBookDto,
) {}
