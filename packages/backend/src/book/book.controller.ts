import { Controller, Get, Post, Body, Param, Delete, UseGuards,Request, UseInterceptors, UploadedFile, Put, Query, Req, HttpStatus, HttpException} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentication/jwt/jwt-auth.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Role } from 'src/enums/role.enum';
import { BookService } from './book.service';
import { UserBookService } from 'src/user-book/user-book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksApiService } from 'src/books-api/books-api.service';
import { CreateUserBookDto } from 'src/user-book/dto/create-user-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService, 
              private readonly booksApiService: BooksApiService,
              private readonly userBookService: UserBookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    //return this.bookService.create(createBookDto);
  }

  @Get()
  @Roles(Role.USER,Role.ADMIN)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  async getBooks(@Request() req: any) {
    return this.bookService.getBooks();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  async getBook(@Request() req: any, @Param('id') id: string) {
      let book = this.bookService.getBookById(id);
      if (!book) {
        book = this.booksApiService.getBookById(id);
      }
      return book;
  }

  @Get('title/:title')
  @Roles(Role.ADMIN, Role.USER)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByTitle(@Request() req: any, @Param('title') title: string) {
    let books = this.bookService.getBooksByTitle(title);
    if(!books){
      books = this.booksApiService.getBooksByTitle(title);
    }
    return books;
  }

  @Get('author/:id')
  @Roles(Role.ADMIN, Role.USER)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByAuthour(@Request() req: any, @Param('AuthorName') AuthorName: string) {
      return this.bookService.getBookById(AuthorName);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Request() req: any, @Param('id') id: string) {
      return this.bookService.deleteBook(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('bookImage'))
  //@UseGuards(JwtAuthGuard, RolesGuard)
  async CreateBook(@UploadedFile() bookImage: Express.Multer.File, @Body() createBookDto: CreateBookDto) {
      let imageName : String = null;
      if (bookImage) {
          imageName = bookImage.filename;
      }
      return this.bookService.CreateBook(createBookDto, imageName);
  }

  @Put('rate/:id?')
  @Roles(Role.ADMIN, Role.USER)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  async rateBook(@Req() req: Request, @Param('id') id: string, @Query('rating') rating: number){
    return this.bookService.rateBook(id, rating);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.USER)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  async postBook(@Body() createUserBookDto: CreateUserBookDto){
    let book =  await this.bookService.getBookById(createUserBookDto.book.book_id);
    if (!book) {
      book = await this.booksApiService.getBookById(createUserBookDto.book.book_id);
      this.bookService.CreateBook( book, book.imageUrl);
    }
    this.userBookService.CreateUserBook(createUserBookDto);
  }

}
