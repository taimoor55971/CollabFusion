import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export function generateBearerToken(user: User, jwtService: JwtService): string {
  const payload = { sub: user.id, username: user.username, email: user.email };
  const token = jwtService.sign(payload,{
    secret:process.env.JWT_TOKEN,
    expiresIn:'12h'
  });

  return token;
}
