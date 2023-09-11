import { Module } from '@nestjs/common';
import { StaffAuthController } from './staff-auth.controller';
import { StaffAuthService } from './staff-auth.service';
import { PassportModule } from '@nestjs/passport';
import { StaffsModule } from 'src/modules/staffs/staffs.module';
import { LocalStaffStrategy } from 'src/core/strategies/auth/staffs/local-staff.strategy';
import { JwtStaffStrategy } from 'src/core/strategies/auth/staffs/jwt-staff.strategy';

@Module({
  controllers: [StaffAuthController],
  providers: [StaffAuthService, LocalStaffStrategy, JwtStaffStrategy],
  imports: [StaffsModule, PassportModule],
})
export class StaffAuthModule {}
