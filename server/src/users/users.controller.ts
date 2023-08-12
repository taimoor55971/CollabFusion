import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './Dto';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.UsersService.register(registerDto);
    return {
      message: 'User Created Successfully',
      accessToken: result.accessToken,
    };
  }
}
