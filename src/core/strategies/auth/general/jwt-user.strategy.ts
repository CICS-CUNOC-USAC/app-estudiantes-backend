// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UsersService } from 'src/modules/users/users.service';
// import { StaffsService } from 'src/modules/staffs/staffs.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'general-jwt') {
//   constructor(
//     private readonly userService: UsersService,
//     private readonly staffService: StaffsService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWTKEY,
//     });
//   }

//   async validate(payload: object): Promise<any> {
//     // return user if present. If not, returns null
//     if (payload['profile_id']) {
//       const user = await this.userService.findAvailableAndReturnById(
//         payload['id'],
//       );
//       return user;
//     } else {
//       const staff = await this.staffService.findOne(payload['id']);
//       return staff;
//     }
//   }
// }
