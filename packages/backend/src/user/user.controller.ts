import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UnauthorizedException, HttpException, HttpStatus, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/authentication/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUsers(@Request() req: any){
      return this.usersService.getUsers();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUser(@Request() req: any, @Param('id') id: string) {
      if (req.role != Role.ADMIN || req.userId != id){
          throw new UnauthorizedException;
      }
      return this.usersService.getUserById(id);
  }

  @Post(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(@Request() req: any, @Param('id') id: string, @Body() updateUserDto : UpdateUserDto) {
      if (updateUserDto.password && updateUserDto.confirmPassword && updateUserDto.password != updateUserDto.confirmPassword){
          throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);
      }
      if ((updateUserDto.password && !updateUserDto.confirmPassword) || (!updateUserDto.password) && (updateUserDto.confirmPassword)){
          throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);        }
      return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Request() req: any, @Param('id') id: string) {
      return this.usersService.deleteUser(id);
  }

  @Put()
  async register(@Body() createUserDto: CreateUserDto) {
      const user = await this.usersService.getUserByEmail(createUserDto.email);
      if (user){
          throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
      }
      if (createUserDto.password != createUserDto.confirmPassword) {
          throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);
      }
      return this.usersService.register(createUserDto);
  }
}
