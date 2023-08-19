import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  HttpException,
  Query,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './Dto';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { PrismaClient } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private loginService: LoginService,
    private registerService: RegisterService,
    private PrismaClient: PrismaClient,
  ) {}
  @Get()
  async GetUser(@Query('email') email: string) {
    const user = await this.PrismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('Not Found');
    }
    return user;
  }
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.registerService.register(registerDto);
    return {
      message: 'User Created Successfully',
      accessToken: result.accessToken,
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.loginService.login(loginDto);

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Generate an access token and return it in the response
    const accessToken = user.accessToken;
    return {
      message: 'Login Successful',
      accessToken: accessToken,
    };
  }
}
