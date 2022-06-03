import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { Roles } from '../authorization/roles.decorator';
import { Role } from '../../enums/role.enum';
import { JwtAuthGuard } from '../authentication/jwt/jwt-auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { UpdateUserBookAvailabilityDto } from './dto/update-user-book-availability.dto';

@Controller('user-book')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserBooks(@Request() req: any){
    return this.userBookService.getUserBooks();
  }

  @Get('user/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserBooksByUserId(@Request() req: any, @Param('id') id: string){
      return this.userBookService.getUserBooksByUser(id);
  }
  
  @Get('book/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
 async getAvailableUserBooksByBookId(@Request() req: any, @Param('id') id: string) {
      return this.userBookService.getAvailableUserBooksByBook(id);
 }

  @Post("available/:id")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUserBookAvailability(@Request() req: any, @Param('id') id: string, @Body() updateUserBookAvailabilityDto : UpdateUserBookAvailabilityDto){
    const userBook = await this.userBookService.getUserBookById(id);
    if (req.user.role !== Role.ADMIN && req.user.userId !== userBook.user.id) {
      throw UnauthorizedException;
    }
    return this.userBookService.updateUserBookAvailability(id ,updateUserBookAvailabilityDto)
  }

  @Delete(":id")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUserBook(@Request() req: any, @Param('id') id: string){
    const userBook = await this.userBookService.getUserBookById(id);
    if (req.user.role !== Role.ADMIN && req.user.userId !== userBook.user.id) {
      throw UnauthorizedException;
    }
    return this.userBookService.delete(id);
  }

}
