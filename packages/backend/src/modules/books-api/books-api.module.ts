import { Module } from '@nestjs/common';
import {HttpModule } from '@nestjs/axios';
import { BooksApiService } from './books-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [BooksApiService],
    exports: [BooksApiService],
    imports: [HttpModule]
  })
  export class BooksApiModule {}
