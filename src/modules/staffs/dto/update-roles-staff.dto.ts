import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateStaffRolesDto {
  @ApiProperty({
    description: 'Array of role ids. This will replace the current roles.',
    type: [Number],
  })
  @IsNumber({}, { each: true })
  rolesIds: number[];
}
