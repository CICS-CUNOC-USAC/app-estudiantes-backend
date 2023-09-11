// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { StaffsService } from 'src/staffs/staffs.service';
// import { EUserTypes } from 'src/database/models/user.model';

// @Injectable()
// export class JwtStaffStrategy extends PassportStrategy(Strategy, 'staff-jwt') {
//   constructor(private readonly staffService: StaffsService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWTKEY,
//     });
//   }

//   async validate(payload: object): Promise<any> {
//     // return staff if present. If not, returns undefined
//     if (!payload['profile_id']) {
//       const staff = await this.staffService.findOne(payload['id']);
//       if (!staff) {
//         return null;
//       }
//       return { type: EUserTypes[EUserTypes.staff], ...staff };
//     }
//     return null;
//   }
// }
