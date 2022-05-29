import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { BooksApiService } from "./books-api.service";

@Module({
  imports: [HttpModule],
  providers: [BooksApiService],
  exports: [BooksApiService]
})
export class BooksApiModule {
}
