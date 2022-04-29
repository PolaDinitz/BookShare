import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { Book } from 'src/book/entities/book.entity';
import { UpdateUserBookDto } from './dto/update-user-book.dto';

@Injectable()
export class UserBookService {
  
  public async create(createBookDto: CreateBookDto) {
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
