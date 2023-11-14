import { PartialType } from '@nestjs/swagger';
import { CreateRoleDetailDto } from './create-role-detail.dto';

export class UpdateRoleDetailDto extends PartialType(CreateRoleDetailDto) {}
