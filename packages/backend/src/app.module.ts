import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { UsersModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/authentication/auth.module";
import { BooksApiModule } from "./modules/books-api/books-api.module";
import { UserBookModule } from "./modules/user-book/user-book.module";
import { BookModule } from "./modules/book/book.module";
import { ChatGateway } from "./chat.gateway";
import { ChatModule } from "./modules/chat/chat.module";
import { BookCategoryModule } from "./modules/book-category/book-category.module";
import { TransactionModule } from "./modules/transaction/transaction.module";


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    BooksApiModule,
    BookModule,
    UserBookModule,
    TransactionModule,
    BookCategoryModule,
    ChatModule
  ],
  providers: [ChatGateway],
  controllers: [AppController]
})

export class AppModule {
  constructor(private connection: Connection) {
  }
}
