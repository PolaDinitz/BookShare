import { Injectable } from '@nestjs/common';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class BooksApiService {
    getBooksByTitle(title: string): Promise<Book[]> {
      throw new Error('Method not implemented.');
    }

    public async getBookById(queryString: string): Promise<Book>{
        return null;
    }
}
