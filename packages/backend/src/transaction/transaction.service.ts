import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateBookRatingDto } from './dto/update-book-rating.dto';
import { UpdatelentUserRatingDto } from './dto/update-lent-user-rating.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  public async create(createTransactionDto: CreateTransactionDto) {
    return await this.transactionRepository.save(this.transactionRepository.create({
      startDate: new Date(),
      borrowUserId: createTransactionDto.borrowUserId,
      userBookId: createTransactionDto.userBookId
    }));
  }

  public async getTransactions() {
    return this.transactionRepository.find({
      relations: ['borrowUser'] // 'userBook', 'userBook.user', 'userBook.book'
    });
  }

  public async getTransactionById(id: string) {
    return this.transactionRepository.findOne(id, {
      relations: ['borrowUser'] // 'userBook', 'userBook.user', 'userBook.book'
    });
  }

  public async updateStatus(id: string, updateTransactionStatusDto: UpdateTransactionStatusDto) {
    return this.transactionRepository.update(id, updateTransactionStatusDto);
  }

  public async updateBookRating(id: string, updateBookRatingDto: UpdateBookRatingDto) {
    return this.transactionRepository.update(id, updateBookRatingDto);
  }
  
  public async updateBorrowUserRating(id: string, updateBorrowUserRatingDto) {
    return this.transactionRepository.update(id, updateBorrowUserRatingDto)
  }
  
  public async updateLentUserRating(id: string, updateLentUserRatingDto: UpdatelentUserRatingDto) {
    return this.transactionRepository.update(id, updateLentUserRatingDto);
  }
}
