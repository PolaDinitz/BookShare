import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { BooksRecommendationEngineService } from "./books-recommendation-engine.service";
import { Roles } from "../authorization/roles.decorator";
import { Role } from "../../enums/role.enum";
import { JwtAuthGuard } from "../authentication/jwt/jwt-auth.guard";
import { RolesGuard } from "../authorization/roles.guard";
import { TransactionService } from "../transaction/transaction.service";
import { Transaction } from "../transaction/entities/transaction.entity";

@Controller("books-recommendation-engine")
export class BooksRecommendationEngineController {

  constructor(private booksRecommendationEngineService: BooksRecommendationEngineService,
              private transactionService: TransactionService) {
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getRecommendedBooks(@Request() req: any) {
    const LastBooksLimit = 1;
    const userId: string = req.user.userId;
    const lastBorrowedBooksIds: string[] = (await this.transactionService.getLastTransactionsByBorrowUser(userId, LastBooksLimit)).map((transaction: Transaction) => transaction.userBook.bookId);
    return this.booksRecommendationEngineService.getRecommendedBooks(lastBorrowedBooksIds);
  }

}
