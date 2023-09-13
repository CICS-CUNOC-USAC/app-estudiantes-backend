import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// import { StaffsModule } from 'src/staffs/staffs.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  // providers: [JwtStrategy],
  imports: [
    // StaffsModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
})
export class GeneralAuthModule {}
