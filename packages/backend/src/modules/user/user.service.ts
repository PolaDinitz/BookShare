import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/enums/role.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { DEFAULT_USER_IMAGE_FILE_NAME, IMAGES_USER_ASSETS_PATH, IMAGES_PUBLIC_ASSETS_PATH } from "../../consts/images.consts";
import { unlinkSync } from 'fs';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['borrowTransactions']
    });
  }

  public async getUserById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id, {
      relations: ['borrowTransactions']
    });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      relations: ['borrowTransactions'],
      where: { 
        email : email
      }
    });
  }

  public async updateRefreshToken(id : string, refresh_token : string) {
    if (refresh_token !== null) {
      return await this.usersRepository.update(id, {
        refreshToken: await bcrypt.hash(refresh_token, 10)
      });
    }
    return await this.usersRepository.update(id, {
      refreshToken : null
    });
  }

  public async updateUser(id : string , updateUserDto: UpdateUserDto, imageName : String) {
    const oldUser = await this.getUserById(id);

    let pass = oldUser.password;
    if (updateUserDto.password) {
        pass = await this.hashPassword(updateUserDto.password);
    }
 
    if (imageName !== null && imageName !== oldUser.imageUrl && oldUser.imageUrl !== DEFAULT_USER_IMAGE_FILE_NAME) {
      unlinkSync(`${IMAGES_PUBLIC_ASSETS_PATH}/${IMAGES_USER_ASSETS_PATH}/${oldUser.imageUrl}`);
    }

    return await this.usersRepository.update(id, {
        email: updateUserDto.email || oldUser.email,
        firstName: updateUserDto.firstName || oldUser.firstName,
        lastName: updateUserDto.lastName || oldUser.lastName,
        password: pass,
        address: updateUserDto.address || oldUser.address,
        dateOfBirth: updateUserDto.dateOfBirth || oldUser.dateOfBirth,
        phoneNumber: updateUserDto.phoneNumber || oldUser.phoneNumber,
        role: oldUser.role,
        imageUrl: imageName === null ? oldUser.imageUrl : `${IMAGES_USER_ASSETS_PATH}/${imageName.toString()}`
    });
  }
  
  public async register(createUserDto: CreateUserDto, imageName: String) :Promise<User>{
    const password = await this.hashPassword(createUserDto.password)
    const newUser = this.usersRepository.create({
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: password,
        address: createUserDto.address,
        dateOfBirth: createUserDto.dateOfBirth,
        phoneNumber: createUserDto.phoneNumber,
        gender: createUserDto.gender,
        role: Role.USER,
    });

    if (imageName !== null) {
      newUser.imageUrl = `${IMAGES_USER_ASSETS_PATH}/${imageName.toString()}`;
    }
    return await this.usersRepository.save(newUser);
  }

  private async hashPassword(password : string) : Promise<string> {
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(password, salt); 
      return hashed;
  }

  public async deleteUser(id: string) {
    await this.usersRepository.delete(id);
  }
}