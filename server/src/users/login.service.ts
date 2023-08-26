import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './Dto';
import * as bcrypt from 'bcrypt';
import { generateBearerToken } from '../Utils/GenerateToken';

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

    // Generate an access token using the retrieved user object and JWT secret key from process.env
    const jwtSecret = process.env.JWT_TOKEN;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }
    
    const accessToken = generateBearerToken(user, this.jwtService);

    return { accessToken };
  }
}
