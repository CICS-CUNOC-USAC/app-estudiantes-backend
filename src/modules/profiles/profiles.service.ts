import { Inject, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ModelClass, Transaction } from 'objection';
import { ProfileModel } from './entities/profile.model';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { UsersService } from '../users/users.service';
import { BaseService } from 'src/core/utils/base-service';

@Injectable()
export class ProfilesService extends BaseService {
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
