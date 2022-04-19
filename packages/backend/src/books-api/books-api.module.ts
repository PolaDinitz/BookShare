import { Module } from '@nestjs/common';
import {HttpModule } from '@nestjs/axios';
import { BooksApiService } from './books-api.service';
import {BooksApiController } from './books-api.controller';

@Module({
    imports: [HttpModule],
    providers: [BooksApiService],
    controllers: [BooksApiController],
    exports: [BooksApiService]
  })
  export class BooksApiModule {}
