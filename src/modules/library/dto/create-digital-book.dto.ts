import { IntersectionType } from '@nestjs/swagger';
import { CreateLibraryDto } from './create-library.dto';
import { DigitalBookDto } from './digital-book.dto';

export class CreateDigitalBookDto extends IntersectionType(
  CreateLibraryDto,
  DigitalBookDto,
) {}
