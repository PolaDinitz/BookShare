import { Controller, Get,Post, Body, Param, Delete, UseGuards, Request, UnauthorizedException, HttpException, HttpStatus, Put, UseInterceptors, UploadedFile, Req} from '@nestjs/common';
import { Roles } from 'src/authorization/roles.decorator';
import {BooksApiService} from './books-api.service';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/authentication/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Book } from 'src/book/entities/book.entity';


@Controller('books-api')
export class BooksApiController {
    constructor(private readonly books_api_service: BooksApiService) {}

  @Get('books')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByName(@Req() request: Request): Promise<Book[]> {
      return null;
  }

}
