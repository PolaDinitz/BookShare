import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';
import { UpdateBookRatingDto } from './dto/update-book-rating.dto';
import { UpdateBorrowUserRatingDto } from './dto/update-borrow-user-rating.dto';
import { UpdatelentUserRatingDto } from './dto/update-lent-user-rating.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  async getTransactions() {
    return this.transactionService.getTransactions();
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string) {
    return this.transactionService.getTransactionById(id);
  }

  @Patch(':id')
  async updateTransactionStatus(@Param('id') id: string, @Body() updateTransactionStatusDto: UpdateTransactionStatusDto) {
    return this.transactionService.updateStatus(id, updateTransactionStatusDto);
  }

  @Patch(':id')
  async updateBookRating(@Param('id') id: string, @Body() updateBookRatingDto: UpdateBookRatingDto) {
    return this.transactionService.updateBookRating(id, updateBookRatingDto);
  }

  @Patch(':id')
  async updateBorrowUserRating(@Param('id') id: string, @Body() updateBorrowUserRatingDto: UpdateBorrowUserRatingDto) {
    return this.transactionService.updateBorrowUserRating(id, updateBorrowUserRatingDto);
  }
  
  @Patch(':id')
  async updateLentUserRating(@Param('id') id: string, @Body() updateLentUserRatingDto : UpdatelentUserRatingDto) {
    return this.transactionService.updateLentUserRating(id, updateLentUserRatingDto);
  }
}
