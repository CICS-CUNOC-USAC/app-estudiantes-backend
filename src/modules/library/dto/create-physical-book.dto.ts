import { IntersectionType } from '@nestjs/swagger';
import { CreateLibraryDto } from './create-library.dto';
import { PhysicalBookDto } from './physical-book.dto';

export class CreatePhysicalBookDto extends IntersectionType(
  CreateLibraryDto,
  PhysicalBookDto,
) {}
