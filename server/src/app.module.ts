import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { UserModule } from './users/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { PrismaModule } from './users/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisterService } from './users/register.service';
import { LoginService } from './users/login.service';
import { ProjectModule } from './project/project.module';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';

@Module({
  imports: [
    BookModule,
    UserModule,
    PrismaModule,
    ProjectModule,
    ConfigModule.forRoot(),

    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [BookController, UsersController, ProjectController],
  providers: [
    BookService,
    RegisterService,
    LoginService,
    ProjectService,
    JwtService,
  ],
})
export class AppModule {}
