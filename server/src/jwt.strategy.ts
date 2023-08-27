// // jwt.strategy.ts

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { PrismaClient, User } from '@prisma/client';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly prisma: PrismaClient) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_TOKEN,
//     });
//   }

//   async validate(payload: any): Promise<User> {
//     const user = await this.prisma.user.findUnique({
//       where: { id: payload.sub },
//     });

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     return user;
//   }
// }
