import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { UserBookService } from "../user-book/user-book.service";
import { UserBook } from "../user-book/entities/user-book.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BooksRecommendationEngineService {

    constructor(private httpService: HttpService,
                private userBookService: UserBookService,
                private configService: ConfigService) {
    }

    public async getRecommendedBooks(lastBorrowedBooksIds: string[]): Promise<string[]> {
        const algorithmApiUrl = this.configService.get("ALGORITHM_API_URL");
        const recommendedBooksIds: string[] = (await firstValueFrom(this.httpService.get(`${algorithmApiUrl}/recommend/${lastBorrowedBooksIds.join()}`))).data.book_id;
        const availableUserBooks: UserBook[] = await this.userBookService.getAvailableUserBooks();
        recommendedBooksIds.filter((bookId: string) => availableUserBooks.find((userBook: UserBook) => userBook.bookId === bookId));
        return recommendedBooksIds;
    }
}
