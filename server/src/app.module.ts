import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { UserModule } from './users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from './users/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisterService } from './users/register.service';
import { LoginService } from './users/login.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    BookModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_TOKEN'), 
        signOptions: { expiresIn: '1h' }, 
      }),
      inject: [ConfigService], // Inject the ConfigService
    }), TaskModule,
  ],
  controllers: [BookController, UsersController, TaskController],
  providers: [BookService,RegisterService,LoginService], 
})
export class AppModule {}
