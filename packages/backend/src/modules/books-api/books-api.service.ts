import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BooksApiService {

    constructor(private httpService: HttpService) {}

    public async getBooksByTitle(title: string) : Promise<BookApi[]> {
      const items = (await firstValueFrom(this.httpService.get(`https://www.googleapis.com/books/v1/volumes?q=isbn+intitle:"${title.replace(" ", "+")}"&printType=books&langRestrict=en,he`))).data.items;
      const newItems = [];
      items?.map((item) => {
        let newItem = {
          id: item.id,
          description: item.volumeInfo.description || null,
          title: item.volumeInfo.title,
          categories: item.volumeInfo.categories || null,
          author: (item.volumeInfo.authors) ? item.volumeInfo.authors[0] : null
        }
        if (item.volumeInfo.imageLinks) {
          newItem["imageUrl"] = item.volumeInfo.imageLinks.thumbnail;
        }
        newItems.push(newItem);
      });
      return newItems;
    }

    public async getBookById(id: string) : Promise<BookApi> {
      const bookItem = (await firstValueFrom(this.httpService.get(`https://www.googleapis.com/books/v1/volumes/${id}`))).data;
      let book = {
        id: bookItem.id,
        title: bookItem.volumeInfo.title,
        categories: bookItem.volumeInfo.categories ? bookItem.volumeInfo.categories : [],
        description: bookItem.volumeInfo.description?.replace(/<(.*?)>/g, ""),
        author: (bookItem.volumeInfo.authors) ? bookItem.volumeInfo.authors[0] : null
      }
      if (bookItem.volumeInfo.imageLinks) {
        book["imageUrl"] = bookItem.volumeInfo.imageLinks.thumbnail;
      }
      return book;
    }
}
