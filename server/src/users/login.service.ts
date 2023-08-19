import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './Dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

 

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate an access token using the retrieved user object
    const accessToken = this.generateAccessToken(user);

    return { accessToken} ;
  }

  generateAccessToken(user: User): string {
    const payload = { sub: user.id, username: user.username, email: user };
    return this.jwtService.sign(payload,{
      secret: process.env.JWT_TOKEN,
      expiresIn: '12h',
      
    });
  }
}
