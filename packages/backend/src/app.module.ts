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
import {
  BooksRecommendationEngineModule
} from "./modules/books-recommendation-engine/books-recommendation-engine.module";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: String(configService.get('DATABASE_NAME')),
          entities: ["dist/**/*.entity{.ts,.js}"],
          synchronize: true,
        };
      }
    }),
    AuthModule,
    UsersModule,
    BooksApiModule,
    BookModule,
    UserBookModule,
    TransactionModule,
    BookCategoryModule,
    ChatModule,
    BooksRecommendationEngineModule
  ],
  providers: [ChatGateway],
  controllers: [AppController]
})

export class AppModule {
  constructor(private connection: Connection) {
  }
}
