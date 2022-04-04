import { Injectable } from '@nestjs/common';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';

@Injectable()
export class UserBookService {
  create(createUserBookDto: CreateUserBookDto) {
    return 'This action adds a new userBook';
  }

  findAll() {
    return `This action returns all userBook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userBook`;
  }

  update(id: number, updateUserBookDto: UpdateUserBookDto) {
    return `This action updates a #${id} userBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBook`;
  }
}
