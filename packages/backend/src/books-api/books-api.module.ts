import { Module } from '@nestjs/common';
import { BooksApiService } from './books-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    providers: [BooksApiService],
    exports: [BooksApiService],
    imports: [HttpModule]
  })
  export class BooksApiModule {}
