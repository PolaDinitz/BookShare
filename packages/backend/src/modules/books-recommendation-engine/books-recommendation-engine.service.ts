import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { BookService } from "../book/book.service";
import { Book } from "../book/entities/book.entity";

@Injectable()
export class BooksRecommendationEngineService {

  constructor(private httpService: HttpService,
              private bookService: BookService,
              private configService: ConfigService) {
  }

  public async getRecommendedBooks(lastBorrowedBooksIds: string[], userId: string): Promise<string[]> {
    const algorithmApiUrl = this.configService.get("ALGORITHM_API_URL");
    const recommendedBooks: { book_id: string[], title: string[] } = (await firstValueFrom(this.httpService.get(`${algorithmApiUrl}/recommend/${lastBorrowedBooksIds.join()}`))).data;
    return (await this.bookService.getAvailableBooksIdsAndTitlesExcludingUser(recommendedBooks.book_id, recommendedBooks.title, userId)).map((book: Book) => book.id);
  }
}
