import { Module } from "@nestjs/common";
import { BooksRecommendationEngineService } from "./books-recommendation-engine.service";
import { BooksRecommendationEngineController } from "./books-recommendation-engine.controller";
import { HttpModule } from "@nestjs/axios";
import { TransactionService } from "../transaction/transaction.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../transaction/entities/transaction.entity";
import { BookService } from "../book/book.service";
import { Book } from "../book/entities/book.entity";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Transaction, Book])],
  providers: [BooksRecommendationEngineService, TransactionService, BookService, ConfigService],
  controllers: [BooksRecommendationEngineController],
  exports: [BooksRecommendationEngineService]
})
export class BooksRecommendationEngineModule {
}
