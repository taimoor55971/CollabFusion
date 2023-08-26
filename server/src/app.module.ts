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
import {AuthenticationMiddleware} from './middleware/authentication/authentication.middleware';
import { MiddlewareConsumer ,NestModule} from '@nestjs/common'

// import { TaskService } from './project/Tasks/Tasks.service';
// import { TasksModule } from './project/tasks/tasks.module';
// import { TasksController } from './project/tasks/tasks.controller';
import { TaskService } from './project/tasks/tasks.service';
import { TaskController } from './project/tasks/tasks.controller';
import { TaskModule } from './project/tasks/tasks.module';
import { JwtStrategy } from './jwt.strategy';
// import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [
    BookModule,
    UserModule,
    PrismaModule,
    ProjectModule,
    TaskModule,
    ConfigModule.forRoot(),

    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '12h' },
      
    }),

  ],
  controllers: [BookController, UsersController, ProjectController,TaskController],
  providers: [
    BookService,
    RegisterService,
    LoginService,
    ProjectService,
    JwtService,
    TaskService,
    JwtStrategy
    // AuthenticationMiddleware
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthenticationMiddleware).exclude('users/login').forRoutes('*')
  }
}
