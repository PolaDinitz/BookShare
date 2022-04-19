import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class BooksApiService {
    
    constructor(private httpService: HttpService, private bookService: BookService) {} 

    public getBooksByTitle(title: string): Book {
      let apiUrl: string = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&langRestrict=en`
      this.httpService.get(apiUrl).pipe(map(response => response.data)).subscribe(response => {
        let book = {
          "book_id": response.id,
          "title": response.volumeInfo.title,response,
          "author": response.volumeInfo.authors,
          "description": response.volumeInfo.description,
          "genres": response.volumeInfo.categories,
          "book_rating":response.volumeInfo.averageRating,
          "count":response.volumeInfo.ratingCount}
          return book;
      })

      return null;
    }

    public async getBookById(id: string): Promise<AxiosResponse<any, any>>{
      let apiUrl: string = `https://www.googleapis.com/books/v1/volumes/${id}`
      return firstValueFrom(this.httpService.get(apiUrl))
    }

    
}
