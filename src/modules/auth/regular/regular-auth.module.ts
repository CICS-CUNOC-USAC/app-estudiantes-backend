import { Module } from '@nestjs/common';
import { RegularAuthController } from './regular-auth.controller';
import { RegularAuthService } from './regular-auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { LocalRegularStrategy } from 'src/core/strategies/auth/regular/local-regular.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtRegularStrategy } from 'src/core/strategies/auth/regular/jwt-regular.strategy';
import { ProfilesModule } from 'src/modules/profiles/profiles.module';
import { UserCoursesProgressModule } from 'src/modules/user-courses-progress/user-courses-progress.module';
import { RedisModule } from 'src/modules/redis/redis.module';
import { EmailModule } from 'src/modules/emails/email.module';
import { ConsumeService } from 'src/modules/consume-service/consume-service.service';
import { ConsumeServiceModule } from 'src/modules/consume-service/consume-service.module';

@Module({
  controllers: [RegularAuthController],
  providers: [RegularAuthService, LocalRegularStrategy, JwtRegularStrategy],
  imports: [
    UsersModule,
    RedisModule,
    EmailModule,
    ProfilesModule,
    PassportModule,
    UserCoursesProgressModule,
    ConsumeServiceModule
  ],
})
export class RegularAuthModule {}
