import { Inject, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Model, ModelClass, QueryBuilder, Transaction } from 'objection';
import { ProfileModel } from './entities/profile.model';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { UsersService } from '../users/users.service';
import { BaseService } from 'src/core/utils/base-service';
import { BaseQueryDto } from 'src/core/utils/base-query.dto';

@Injectable()
export class ProfilesService extends BaseService {
  queryFilters(
    queryDto: BaseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(ProfileModel.name)
    private readonly profileModel: ModelClass<ProfileModel>,
    private readonly usersService: UsersService,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(ProfilesService.name);
  }

  async create(
    createUserDto: CreateUserDto,
    profileDto: object,
    trx?: Transaction | null,
  ): Promise<ProfileModel> {
    // Create the new profile
    const profile = await this.profileModel
      .query(trx)
      .select('id')
      .insert(profileDto);

    await this.usersService.create(profile.$id(), createUserDto, trx);

    return await this.profileModel
      .query(trx)
      .findById(profile.$id())
      .withGraphFetched('user');
  }

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
