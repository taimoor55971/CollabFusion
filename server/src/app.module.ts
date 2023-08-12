import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { UserModule } from './users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from './users/prisma.module';

@Module({
  imports: [
    BookModule, // Import BookModule
    UserModule,
    PrismaModule, // Import UserModule
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your actual secret
      signOptions: { expiresIn: '1h' }, // Adjust expiration as needed
    }),
    
  ],
  controllers: [BookController, UsersController], // Specify controllers
  providers: [BookService, UsersService], // Specify providers (remove JwtService)
})
export class AppModule {}
