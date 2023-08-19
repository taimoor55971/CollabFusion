import { Module, Controller } from '@nestjs/common';
import { UsersController } from './users.controller';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';

@Module({})
export class UserModule {
  Controller = [UsersController]
  Provider = [LoginService,RegisterService];
}
