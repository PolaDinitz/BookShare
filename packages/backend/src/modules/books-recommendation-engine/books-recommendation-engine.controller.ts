import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { BooksRecommendationEngineService } from "./books-recommendation-engine.service";
import { Roles } from "../authorization/roles.decorator";
import { Role } from "../../enums/role.enum";
import { JwtAuthGuard } from "../authentication/jwt/jwt-auth.guard";
import { RolesGuard } from "../authorization/roles.guard";
import { TransactionService } from "../transaction/transaction.service";
import { Transaction } from "../transaction/entities/transaction.entity";
import { BookService } from "../book/book.service";
import { Book } from "../book/entities/book.entity";

@Controller("books-recommendation-engine")
export class BooksRecommendationEngineController {

  constructor(private booksRecommendationEngineService: BooksRecommendationEngineService,
              private transactionService: TransactionService,
              private bookService: BookService
  ) {
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getRecommendedBooks(@Request() req: any) {
    const lastBooksLimit = 1;
    const popularBooksLimit = 10;
    const userId: string = req.user.userId;
    const lastBorrowedBooksIds: string[] = (await this.transactionService.getLastTransactionsByBorrowUser(userId, lastBooksLimit)).map((transaction: Transaction) => transaction.userBook.bookId);
    if (lastBorrowedBooksIds.length !== 0) {
      this.booksRecommendationEngineService.getRecommendedBooks(lastBorrowedBooksIds)
        .then(async (booksIds: string[]) => {
          if (booksIds.length > 0)
            return booksIds;
        })
        .catch((error) => {
          console.log("There was an error with the recommendation engine: " + error.message);
        });
    }
    return (await this.bookService.getPopularBooksExcludingUser(popularBooksLimit, userId)).map((book: Book) => book.id);
  }

}
