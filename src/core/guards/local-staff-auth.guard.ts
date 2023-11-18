import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This class only extends the passport-local strategy guard to avoid having
// to write the same code in multiple places and having magic strings.
@Injectable()
export class StaffLoginLocalAuthGuard extends AuthGuard('staff-login') {}
