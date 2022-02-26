import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/enums/role.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async getUserById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { 
        email : email
      }
    });
  }

  public async updateUser(id : string , updateUserDto: UpdateUserDto) {
    const oldUser = await this.getUserById(id);

    let pass = oldUser.password;
    if (updateUserDto.password) {
        pass = await this.hashPassword(updateUserDto.password);
    }
    return await this.usersRepository.update(id, {
        email: updateUserDto.email || oldUser.email,
        firstName: updateUserDto.firstName || oldUser.firstName,
        lastName: updateUserDto.lastName || oldUser.lastName,
        password: pass,
        address: updateUserDto.address || oldUser.address,
        dateOfBirth: updateUserDto.dateOfBirth || oldUser.dateOfBirth,
        phoneNumber: updateUserDto.phoneNumber || oldUser.phoneNumber,
        role: oldUser.role
    });
  }
  
  public async register(createUserDto: CreateUserDto) :Promise<User>{
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
        role: Role.USER
    });
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