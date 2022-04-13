import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';
import { UpdateBookRatingDto } from './dto/update-book-rating.dto';
import { UpdateBorrowUserRatingDto } from './dto/update-borrow-user-rating.dto';
import { UpdatelentUserRatingDto } from './dto/update-lent-user-rating.dto';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/authorization/roles.decorator';
import { JwtAuthGuard } from 'src/authentication/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactions() {
    return this.transactionService.getTransactions();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactionById(@Param('id') id: string) {
    return this.transactionService.getTransactionById(id);;
  }

  @Patch('/status/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateTransactionStatus(@Request() req: any, @Param('id') id: string, @Body() updateTransactionStatusDto: UpdateTransactionStatusDto) {
    const transaction = await this.transactionService.getTransactionById(id);
    if (transaction && (transaction.borrowUserId === req.user.userId )) { // || transaction.userBook.userId === req.user.userId
      return this.transactionService.updateStatus(id, updateTransactionStatusDto);
    }
    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  }

  @Patch('/bookRate/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateBookRating(@Request() req: any, @Param('id') id: string, @Body() updateBookRatingDto: UpdateBookRatingDto) {
    const transaction = await this.transactionService.getTransactionById(id);
    if (transaction && (transaction.borrowUserId === req.user.userId )) {
      return this.transactionService.updateBookRating(id, updateBookRatingDto);
    }
    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  }

  @Patch('/borrowUserRate/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateBorrowUserRating(@Request() req: any, @Param('id') id: string, @Body() updateBorrowUserRatingDto: UpdateBorrowUserRatingDto) {
    const transaction = await this.transactionService.getTransactionById(id);
    if (transaction) { // && transaction.userBook.userId === req.user.userId
      return this.transactionService.updateBorrowUserRating(id, updateBorrowUserRatingDto);
    }
    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  }
  
  @Patch('/lentUserRate/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateLentUserRating(@Request() req: any, @Param('id') id: string, @Body() updateLentUserRatingDto : UpdatelentUserRatingDto) {
    const transaction = await this.transactionService.getTransactionById(id);
    if (transaction && transaction.borrowUserId === req.user.userId) {
      return this.transactionService.updateLentUserRating(id, updateLentUserRatingDto);
    }
    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  }
}
