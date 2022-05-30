import { Module } from "@nestjs/common";
import { BooksRecommendationEngineService } from "./books-recommendation-engine.service";
import { BooksRecommendationEngineController } from "./books-recommendation-engine.controller";
import { HttpModule } from "@nestjs/axios";
import { TransactionService } from "../transaction/transaction.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserBook } from "../user-book/entities/user-book.entity";
import { User } from "../user/entities/user.entity";
import { Transaction } from "../transaction/entities/transaction.entity";

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Transaction, UserBook, User])],
  providers: [BooksRecommendationEngineService, TransactionService],
  controllers: [BooksRecommendationEngineController],
  exports: [BooksRecommendationEngineService]
})
export class BooksRecommendationEngineModule {
}
