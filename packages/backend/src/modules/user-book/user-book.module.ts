import { Module } from "@nestjs/common";
import { UserBookService } from "./user-book.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserBook } from "./entities/user-book.entity";
import { UserBookController } from "./user-book.controller";
import { UsersModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserBook]), UsersModule],
  providers: [UserBookService],
  controllers: [UserBookController],
  exports: [UserBookService]
})
export class UserBookModule {
}
