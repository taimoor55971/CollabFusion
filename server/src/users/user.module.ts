import { Module, Controller } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({})
export class UserModule {
  Controller = [UsersController];
  Provider = [UsersService];
}
