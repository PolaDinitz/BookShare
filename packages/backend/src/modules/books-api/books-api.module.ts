import { Module } from "@nestjs/common";
import { BooksApiService } from "./books-api.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [BooksApiService],
  exports: [BooksApiService]
})
export class BooksApiModule {
}
