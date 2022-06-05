import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UnauthorizedException, HttpException, HttpStatus, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../../modules/authorization/roles.decorator';
import { Role } from '../../enums/role.enum';
import { JwtAuthGuard } from '../../modules/authentication/jwt/jwt-auth.guard';
import { RolesGuard } from '../../modules/authorization/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
      return this.usersService.getUserById(id);
  }

  @Get('rate/:id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserRating(@Request() req: any, @Param('id') id: string) {
      return this.usersService.getUserRating(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('profileImage'))
  async updateUser(@Request() req: any, @Param('id') id: string, @Body() updateUserDto : UpdateUserDto, @UploadedFile() profileImage: Express.Multer.File) {
      if (req.user.role !== Role.ADMIN && req.user.userId !== id){
        throw new UnauthorizedException;
      }
      if (updateUserDto.password && updateUserDto.confirmPassword && updateUserDto.password !== updateUserDto.confirmPassword){
          throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);
      }
      if ((updateUserDto.password && !updateUserDto.confirmPassword) || (!updateUserDto.password) && (updateUserDto.confirmPassword)){
          throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);        
      }
      const oldUser = await this.usersService.getUserById(id);
      if (!oldUser) {
          throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST);
      }
      if (updateUserDto.email) {
        const user = await this.usersService.getUserByEmail(updateUserDto.email);
        if (user) {
            if (oldUser.email !== user.email) {
                throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
            }
        }  
      }
      let imageName : String = null;
      if (profileImage) {
          imageName = profileImage.filename;
      }

      return await this.usersService.updateUser(id, updateUserDto, imageName);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Request() req: any, @Param('id') id: string) {
      return this.usersService.deleteUser(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('profileImage'))
  async register(@UploadedFile() profileImage: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
      const user = await this.usersService.getUserByEmail(createUserDto.email);
      if (user){
          throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
      }
      if (createUserDto.password !== createUserDto.confirmPassword) {
          throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);
      }

      let imageName : String = null;
      if (profileImage) {
          imageName = profileImage.filename;
      }
      return this.usersService.register(createUserDto, imageName);
  }
}
