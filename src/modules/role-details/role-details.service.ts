import { Injectable } from '@nestjs/common';
import { CreateRoleDetailDto } from './dto/create-role-detail.dto';
import { UpdateRoleDetailDto } from './dto/update-role-detail.dto';

@Injectable()
export class RoleDetailsService {
  create(createRoleDetailDto: CreateRoleDetailDto) {
    return 'This action adds a new roleDetail';
  }

  findAll() {
    return `This action returns all roleDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleDetail`;
  }

  update(id: number, updateRoleDetailDto: UpdateRoleDetailDto) {
    return `This action updates a #${id} roleDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleDetail`;
  }
}
