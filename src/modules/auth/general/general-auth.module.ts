import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtRequiredStrategy } from 'src/core/strategies/auth/general/jwt-required.strategy';
import { StaffsModule } from 'src/modules/staffs/staffs.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  providers: [JwtRequiredStrategy],
  imports: [
    StaffsModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
})
export class GeneralAuthModule {}
