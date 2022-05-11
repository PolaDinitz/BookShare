import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { Roles } from 'src/modules/authorization/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/modules/authentication/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/modules/authorization/roles.guard';
import { UpdateUserBookAvailabilityDto } from './dto/update-user-book-availability.dto';

@Controller('user-book')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}

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
    if (req.user.role !== Role.ADMIN && req.user.userId !== id) {
      return UnauthorizedException;
    }
    return this.userBookService.updateUserBookAvailability(id ,updateUserBookAvailabilityDto)
  }

  @Delete(":id")
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUserBook(@Request() req: any, @Param('id') id: string){
    if (req.user.role !== Role.ADMIN && req.user.userId !== id) {
      return UnauthorizedException;
    }
    return this.userBookService.delete(id);
  }

}
