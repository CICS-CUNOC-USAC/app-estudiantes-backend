import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

export class StaffsQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Name of the staff to search for',
    example: 'John Doe',
  })
  name?: string;

  @ApiProperty({
    description: 'Email of the staff to search for',
    example: 'emailstaff@email.com',
  })
  email?: string;
}
