import { Injectable } from '@nestjs/common';
import { Books } from './book.dto';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class BookService {
  public books: Books[] = [];

  AddBook(book: Books): string {
    book.id=uuidv4()
    this.books.push(book);
    return `Book added successfully`;
  }

  GetBook(): Books[] {
    return this.books;
  }

  UpdateBook(book:Books): string {
    let idx=this.books.findIndex(CurrentBook=>{
        return CurrentBook.id===book.id

    })

    this.books[idx]=book
    return 'Book update success'
   }

  DeleteBook(BookId: string): string {
    this.books = this.books.filter((book) => book.id !== BookId);
    return 'Book Deleted Successfully'
  }
}
