import { Controller, Get, Post, Body, Param, UseGuards,Request, Put, Query, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/authentication/jwt/jwt-auth.guard';
import { Roles } from 'src/modules/authorization/roles.decorator';
import { RolesGuard } from 'src/modules/authorization/roles.guard';
import { Role } from 'src/enums/role.enum';
import { BookService } from './book.service';
import { UserBookService } from 'src/modules/user-book/user-book.service';
import { BooksApiService } from 'src/modules/books-api/books-api.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookCategoryService } from '../book-category/book-category.service';
import { Book } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService, 
              private readonly booksApiService: BooksApiService,
              private readonly userBookService: UserBookService,
              private readonly bookCategoryService: BookCategoryService) {}

  
  private formatBook(book : Book) {
    const newCategories = [];
    book.categories.forEach((category) => {
      newCategories.push(category.category);
    });
    return {
      ...book,
      categories: newCategories
    };
  }

  @Get()
  @Roles(Role.USER,Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooks(@Request() req: any) {
    const books: Book[] = await this.bookService.getBooks();
    const formatedBooks = [];
    books.forEach((book) => {
      formatedBooks.push(this.formatBook(book));
    });
    return formatedBooks;
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBook(@Request() req: any, @Param('id') id: string) {
      const book : Book = await this.bookService.getBookById(id);
      return this.formatBook(book);
  }

  @Get('title/:title')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByTitle(@Request() req: any, @Param('title') title: string) : Promise<BookApi[]> {
    let bookOptions = [];
    const books = await this.bookService.getBooksByTitle(title);
    const formatedBooks = [];
    books.forEach((book) => {
      formatedBooks.push(this.formatBook(book))
    });
    if(formatedBooks.length === 0) {
      bookOptions = await this.booksApiService.getBooksByTitle(title);
    } else {
      formatedBooks.map((book) => {
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
      const books = await this.bookService.getBooksByAuthor(authorName);
      const formatedBooks = [];
      books.forEach((book) => {
        formatedBooks.push(this.formatBook(book));
      });
      return formatedBooks;
  }

  @Get('rating/:rating')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByRating(@Request() req: any, @Param('rating') rating: number) {
      const books = await this.bookService.getBooksByRating(rating);
      const formatedBooks = [];
      books.forEach((book) => {
        formatedBooks.push(this.formatBook(book));
      });
      return formatedBooks;
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Request() req: any, @Body() createBookDto : CreateBookDto) {
    let book =  await this.bookService.getBookById(createBookDto.bookId);
    if (!book) {
      const apiBook = await this.booksApiService.getBookById(createBookDto.bookId);
      return await this.bookService.create(apiBook).then(async () => {
        for (const category of apiBook.categories) {
          await this.bookCategoryService.create(apiBook.id, category);
        }
        return await this.userBookService.create(createBookDto);
      });
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
