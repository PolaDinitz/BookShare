import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class BooksRecommendationEngineService {

  constructor(private httpService: HttpService) {
  }

  public async getRecommendedBooks(lastBorrowedBooksIds: string[]): Promise<string[]> {
    return (await firstValueFrom(this.httpService.get("http://127.0.0.1:8000/recommend/" + lastBorrowedBooksIds.join()))).data.book_id;
  }
}
