import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BooksApiService {

    constructor(private httpService: HttpService) {}

    public async getBooksByTitle(title: string) : Promise<BookApi[]> {
      const items = (await firstValueFrom(this.httpService.get(`https://www.googleapis.com/books/v1/volumes?q=isbn+intitle:"${title.replace(" ", "+")}"&printType=books&langRestrict=en,he`))).data.items;
      const newItems = [];
      items.map((item) => {
        let newItem = {
          id: item.id,
          description: item.volumeInfo.description || null,
          title: item.volumeInfo.title,
          categories: item.volumeInfo.categories,
          author: item.volumeInfo.authors[0]
        }
        if (item.volumeInfo.imageLinks) {
          newItem["imageUrl"] = item.volumeInfo.imageLinks.thumbnail;
        }
        newItems.push(newItem);
      });
      return newItems;
    }

    public async getBookById(id: string) : Promise<BookApi> {
      const bookItem = (await firstValueFrom(this.httpService.get(`https://www.googleapis.com/books/v1/volumes?q=isbn+"${id}"`))).data.items[0];
      let book = {
        id: bookItem.id,
        title: bookItem.volumeInfo.title,
        categories: bookItem.volumeInfo.categories,
        description: bookItem.volumeInfo.description,
        author: bookItem.volumeInfo.authors[0]
      }
      if (bookItem.volumeInfo.imageLinks) {
        book["imageUrl"] = bookItem.volumeInfo.imageLinks.thumbnail;
      }
      return book;
    }
}
