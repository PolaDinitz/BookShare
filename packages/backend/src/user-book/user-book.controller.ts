import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UnauthorizedException, HttpException, HttpStatus, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/authentication/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
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

  @Post(":id")
  @Roles(Role.ADMIN, Role.USER)
  async updateUserBookAvailability(@Request() req: any, @Param('id') id: string, @Body() updateUserBookAvailabilityDto : UpdateUserBookAvailabilityDto){
    return this.userBookService.updateUserBookAvailability(id ,updateUserBookAvailabilityDto)
  }

}
