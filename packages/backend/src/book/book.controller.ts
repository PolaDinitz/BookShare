import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, UseInterceptors, UploadedFile, Put, UnauthorizedException, HttpException, HttpStatus, Query, Req} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentication/jwt/jwt-auth.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { Role } from 'src/enums/role.enum';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    //return this.bookService.create(createBookDto);
  }

  @Get()
  @Roles(Role.USER,Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooks(@Request() req: any) {
    return this.bookService.getBooks();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBook(@Request() req: any, @Param('id') id: string) {
      return this.bookService.getBookById(id);
  }

  @Get('author/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getBooksByAuthour(@Request() req: any, @Param('AuthorName') AuthorName: string) {
      return this.bookService.getBookById(AuthorName);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Request() req: any, @Param('id') id: string) {
      return this.bookService.deleteBook(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('bookImage'))
  async CreateBook(@UploadedFile() bookImage: Express.Multer.File, @Body() createBookDto: CreateBookDto) {
      let imageName : String = null;
      if (bookImage) {
          imageName = bookImage.filename;
      }
      return this.bookService.CreateBook(createBookDto, imageName);
  }

  @Put('rate/:id?')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async rateBook(@Req() req: Request, @Param('id') id: string, @Query('rateing') rating: number){
    return this.bookService.rateBook(id, rating);
  }
}
