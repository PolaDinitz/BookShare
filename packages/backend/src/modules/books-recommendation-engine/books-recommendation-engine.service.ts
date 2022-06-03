import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { UserBookService } from "../user-book/user-book.service";
import { UserBook } from "../user-book/entities/user-book.entity";

@Injectable()
export class BooksRecommendationEngineService {

    constructor(private httpService: HttpService,
                private userBookService: UserBookService) {
    }

    public async getRecommendedBooks(lastBorrowedBooksIds: string[]): Promise<string[]> {
        const recommendedBooksIds: string[] = (await firstValueFrom(this.httpService.get("http://127.0.0.1:8000/recommend/" + lastBorrowedBooksIds.join()))).data.book_id;
        const availableUserBooks: UserBook[] = await this.userBookService.getAvailableUserBooks();
        recommendedBooksIds.filter((bookId: string) => availableUserBooks.find((userBook: UserBook) => userBook.bookId === bookId));
        return recommendedBooksIds;
    }
}
