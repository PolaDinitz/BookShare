import { Controller, Get, Post, Body, Param, UseGuards,Request, Put, Query, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/authentication/jwt/jwt-auth.guard';
import { Roles } from 'src/modules/authorization/roles.decorator';
import { RolesGuard } from 'src/modules/authorization/roles.guard';
import { Role } from 'src/enums/role.enum';
import { BookService } from './book.service';
import { UserBookService } from 'src/modules/user-book/user-book.service';
import { BooksApiService } from 'src/modules/books-api/books-api.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService, 
              private readonly booksApiService: BooksApiService,
              private readonly userBookService: UserBookService) {}

  @Get()
  @Roles(Role.USER,Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooks(@Request() req: any) {
    return await this.bookService.getBooks();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBook(@Request() req: any, @Param('id') id: string) {
      return await this.bookService.getBookById(id);
  }

  @Get('title/:title')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByTitle(@Request() req: any, @Param('title') title: string) : Promise<BookApi[]> {
    let bookOptions = [];
    const books = await this.bookService.getBooksByTitle(title);
    if(books.length === 0) {
      bookOptions = await this.booksApiService.getBooksByTitle(title);
    } else {
      books.map((book) => {
        bookOptions.push({
          id: book.id,
          description: book.description,
          categories: book.categories,
          title: book.title,
          imageUrl: book.imageUrl
        });
      });
    }
    return bookOptions;
  }

  @Get('author/:name')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByAuthor(@Request() req: any, @Param('name') authorName: string) {
      return await this.bookService.getBooksByAuthor(authorName);
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Request() req: any, @Body() createBookDto : CreateBookDto) {
    let book =  await this.bookService.getBookById(createBookDto.bookId);
    if (!book) {
      const apiBook = await this.booksApiService.getBookById(createBookDto.bookId);
      return await this.bookService.create(apiBook).then(async () => await this.userBookService.create(createBookDto));
    }
    return await this.userBookService.create(createBookDto);
  }

  @Put('rate/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async rateBook(@Req() req: Request, @Param('id') id: string, @Query('rating') rating: number){
    return await this.bookService.rateBook(id, rating);
  }

  @Get('rate/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBookRating(@Req() req: Request, @Param('id') id: string) {
    return await this.bookService.getBookRating(id);
  }
}