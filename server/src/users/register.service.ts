import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import {  RegisterDto } from './Dto';
import * as bcrypt from 'bcrypt';
import { generateBearerToken } from 'src/Utils/GenerateToken';

@Injectable()
export class RegisterService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const { username, email, password } = registerDto;

    const existingUserByEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      throw new UnauthorizedException('Email already exists');
    }

    const existingUserByUsername = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserByUsername) {
      throw new UnauthorizedException('Username is already taken');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        
        
      },
    });

    // Generate an access token
    
    const accessToken = generateBearerToken(user, this.jwtService);

    return { accessToken };
  }

  
}
