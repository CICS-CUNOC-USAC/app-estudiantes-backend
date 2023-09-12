import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
  imports: [UsersModule],
})
export class ProfilesModule {}
