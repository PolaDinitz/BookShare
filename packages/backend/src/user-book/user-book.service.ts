import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { Repository } from 'typeorm';
import { UpdateUserBookAvailabilityDto } from './dto/update-user-book-availability.dto';
import { UserBook } from './entities/user-book.entity';

@Injectable()
export class UserBookService {

  constructor(
    @InjectRepository(UserBook)
    private userBookRepository: Repository<UserBook>,
  ) {}

  public async create(createBookDto: CreateBookDto) {
    return await this.userBookRepository.save(this.userBookRepository.create(createBookDto));
  }
  
  public async delete(id: string) {
    return await this.userBookRepository.delete(id);
  }

  public async getUserBooksByUser(userId : string) {
    return await this.userBookRepository.find({
      where: {
        userId: userId
      },
      relations: [
        "book"
      ]
    });
  }

  public async updateUserBookAvailability(id: string, updateUserBookAvailabilityDto: UpdateUserBookAvailabilityDto) {
    return await this.userBookRepository.update(id, {
      available: updateUserBookAvailabilityDto.isAvailable
    });
  }
}
