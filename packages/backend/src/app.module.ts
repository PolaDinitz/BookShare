import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { BooksApiModule } from './books-api/books-api.module';
import { UserBookModule } from './user-book/user-book.module';
import { BookModule } from './book/book.module';


@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule,UsersModule, BooksApiModule, BookModule, UserBookModule],
  controllers: [AppController],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
