import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({})
export class BookModule {
    Controller=[BookController]
    Providers=[BookService]
}
