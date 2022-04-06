import { Module } from '@nestjs/common';
import { BooksApiService } from './books-api.service';
import {BooksApiController } from './books-api.controller';

@Module({
    providers: [BooksApiService],
    controllers: [BooksApiController],
    exports: [BooksApiService]
  })
  export class BooksApiModule {}
