import { Controller, Get,Post,Put,Delete,Body,Param } from '@nestjs/common';
import { BookService } from './book.service';
import { Books } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private BookService: BookService) {}
  @Get('/get')
  GetBook(): Books[] {
    return this.BookService.GetBook();
  }

  @Post('/add')
  AddBook(@Body( ) book:Books):string{
    return this.BookService.AddBook(book)
  }

  @Delete('/delete/:id')
  DeleteBook(@Param("id") BookId:string):string{
    return this.BookService.DeleteBook(BookId)
  }

  @Put('/update')
    UpdateBook(@Body() book:Books):string{
        return this.BookService.UpdateBook(book)
    }
}
