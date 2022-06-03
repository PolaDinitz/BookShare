import { Body, Controller, Get, Param, Post, Put, Query, Req, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../authentication/jwt/jwt-auth.guard";
import { Roles } from "../authorization/roles.decorator";
import { RolesGuard } from "../authorization/roles.guard";
import { Role } from "../../enums/role.enum";
import { BookService } from "./book.service";
import { UserBookService } from "../user-book/user-book.service";
import { BooksApiService } from "../books-api/books-api.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookCategoryService } from "../book-category/book-category.service";
import { Book } from "./entities/book.entity";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService,
              private readonly booksApiService: BooksApiService,
              private readonly userBookService: UserBookService,
              private readonly bookCategoryService: BookCategoryService) {
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooks(@Request() req: any) {
    const books: Book[] = await this.bookService.getBooks();
    return books.map((book) => {
      return {
        ...book,
        genres: book.categories.map((category) => category.category)
      };
    });
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBook(@Request() req: any, @Param("id") id: string) {
    const book: Book = await this.bookService.getBookById(id);
    return {
      ...book,
      genres: book.categories.map((category) => category.category)
    };
  }

  @Get("title/:title")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByTitle(@Request() req: any, @Param("title") title: string): Promise<BookApi[]> {
    let bookOptions = [];
    const books = await this.bookService.getBooksByTitle(title);
    if (books.length === 0) {
      const booksFromApi = await this.booksApiService.getBooksByTitle(title);
      booksFromApi.map((bookFromApi) => {
        bookOptions.push({
          id: bookFromApi.id,
          author: bookFromApi.author,
          description: bookFromApi.description,
          genres: bookFromApi.categories,
          title: bookFromApi.title,
          imageUrl: bookFromApi.imageUrl
        });
      });
    } else {
      books.map((book: Book) => {
        bookOptions.push({
          id: book.id,
          author: book.author,
          description: book.description,
          genres: book.categories.map((category) => category.category),
          title: book.title,
          imageUrl: book.imageUrl
        });
      });
    }
    return bookOptions;
  }

  @Get("author/:name")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByAuthor(@Request() req: any, @Param("name") authorName: string) {
    const books = await this.bookService.getBooksByAuthor(authorName);
    return books.map((book) => {
      return {
        ...book,
        genres: book.categories.map((category) => category.category)
      };
    });
  }

  @Get("rating/:rating")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByRating(@Request() req: any, @Param("rating") rating: number) {
    const books = await this.bookService.getBooksByRating(rating);
    return books.map((book) => {
      return {
        ...book,
        genres: book.categories.map((category) => category.category)
      };
    });
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Request() req: any, @Body() createBookDto: CreateBookDto) {
    let book = await this.bookService.getBookById(createBookDto.bookId);
    if (!book) {
      const apiBook = await this.booksApiService.getBookById(createBookDto.bookId);
      return await this.bookService.create(apiBook).then(async () => {
        for (const category of apiBook.categories) {
          await this.bookCategoryService.create(apiBook.id, category);
        }
        const createdUserBook = await this.userBookService.create(createBookDto);
        return await this.userBookService.getUserBookById(createdUserBook.id);
      });
    }
    const createdUserBook = await this.userBookService.create(createBookDto);
    return await this.userBookService.getUserBookById(createdUserBook.id);
  }

  @Put("rate/:id")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async rateBook(@Req() req: Request, @Param("id") id: string, @Query("rating") rating: number) {
    return await this.bookService.rateBook(id, rating);
  }

  @Get("rate/:id")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBookRating(@Req() req: Request, @Param("id") id: string) {
    return await this.bookService.getBookRating(id);
  }
}
