import { Module } from "@nestjs/common";
import { BooksRecommendationEngineService } from "./books-recommendation-engine.service";
import { BooksRecommendationEngineController } from "./books-recommendation-engine.controller";
import { HttpModule } from "@nestjs/axios";
import { TransactionService } from "../transaction/transaction.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../transaction/entities/transaction.entity";
import { BookService } from "../book/book.service";
import { Book } from "../book/entities/book.entity";
import { UserBookService } from "../user-book/user-book.service";
import { UserBook } from "../user-book/entities/user-book.entity";

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Transaction, Book, UserBook])],
    providers: [BooksRecommendationEngineService, TransactionService, BookService, UserBookService],
    controllers: [BooksRecommendationEngineController],
    exports: [BooksRecommendationEngineService]
})
export class BooksRecommendationEngineModule {
}
