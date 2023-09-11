// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { IGeneralError } from 'src/core/interfaces/response/error/general-error.interface';
// import { StaffAuthService } from 'src/auth/staffs/staff-auth.service';
// import { StaffModel } from 'src/database/models/staff.model';

// @Injectable()
// export class LocalStaffStrategy extends PassportStrategy(
//   Strategy,
//   'staff-login',
// ) {
//   constructor(private readonly authService: StaffAuthService) {
//     super({ usernameField: 'email' });
//   }

//   async validate(email: string, password: string): Promise<any> {
//     const staff: StaffModel = await this.authService.validateStaffCredentials(
//       email,
//       password,
//     );
//     if (!staff) {
//       const error: IGeneralError = {
//         statusCode: 401,
//         message: 'Invalid staff credentials',
//         error: 'Unauthorized',
//       };
//       throw new UnauthorizedException(error);
//     }
//     return staff;
//   }
// }
