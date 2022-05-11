import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';
import { UpdateBookRatingDto } from './dto/update-book-rating.dto';
import { UpdateBorrowUserRatingDto } from './dto/update-borrow-user-rating.dto';
import { UpdatelentUserRatingDto } from './dto/update-lent-user-rating.dto';
import { Role } from '../../enums/role.enum';
import { Roles } from '../authorization/roles.decorator';
import { JwtAuthGuard } from '../authentication/jwt/jwt-auth.guard';
import { RolesGuard } from '../authorization/roles.guard';
import { TransactionStatus } from '../../enums/transaction-status.enum';
import { UserBookService } from '../user-book/user-book.service';
import { handleChangeStatusFromWaitingForBookReturn, handleChangeStatusFromWaitingForChat, handleChangeStatusFromWaitingForLend, handleChangeStatusFromWaitingForReturnApproval } from './transactionStatus.handlers';
import { UsersService } from '../user/user.service';
import { BookService } from '../book/book.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly userBookService: UserBookService,
    private readonly userService: UsersService, 
    private readonly bookService: BookService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Request() req: any, @Body() createTransactionDto: CreateTransactionDto) {
    if (req.user.userId !== createTransactionDto.borrowUserId) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    return await this.transactionService.create(createTransactionDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactions() {
    return await this.transactionService.getTransactions();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactionById(@Request() req: any, @Param('id') id: string) {
    const tran = await this.transactionService.getTransactionById(id);
    if (req.user.role !== Role.ADMIN && req.user.userId !== tran.borrowUserId && req.user.userId !== tran.userBook.userId) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    return tran;
  }

  @Get('borrowUser/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactionsByBorrowUserId(@Param('id') id: string) {
    return await this.transactionService.getTransctionsByBorrowUser(id);;
  }

  
  @Get('lentUser/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactionsByLentUserId(@Param('id') id: string) {
    return await this.transactionService.getTransctionsByLentUser(id);;
  }

  @Patch('status/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateTransactionStatus(@Request() req: any, @Param('id') id: string, @Body() updateTransactionStatusDto: UpdateTransactionStatusDto) {
    const transaction = await this.transactionService.getTransactionById(id);
    if (!transaction || (transaction.borrowUserId !== req.user.userId && transaction.userBook.userId !== req.user.userId)) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    if (!transaction.active) {
      throw new HttpException("Can't change status for inactive transaction", HttpStatus.BAD_REQUEST);
    }
    let newActive = true;
    if (transaction.status === TransactionStatus.WAITING_CHAT_APPROVAL) {
      newActive = handleChangeStatusFromWaitingForChat(transaction, req.user.userId, updateTransactionStatusDto.status);
    }
    else if (transaction.status === TransactionStatus.WAITING_FOR_LEND) {
      newActive = await handleChangeStatusFromWaitingForLend(transaction, req.user.userId, updateTransactionStatusDto.status, this.userBookService, this.transactionService);
    }
    else if (transaction.status === TransactionStatus.WAITING_FOR_BOOK_RETURNED) {
      newActive = await handleChangeStatusFromWaitingForBookReturn(transaction, req.user.userId, updateTransactionStatusDto.status, this.userBookService);
    }
    else if (transaction.status === TransactionStatus.WAITING_FOR_RETURN_APPROVAL) {
      newActive = await handleChangeStatusFromWaitingForReturnApproval(transaction, req.user.userId, updateTransactionStatusDto.status, this.userBookService);
    }
    return await this.transactionService.updateStatus(id, updateTransactionStatusDto, newActive);
  }

  @Patch('report/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async reportUser(@Request() req: any, @Param('id') id: string) {
    const transaction = await this.transactionService.getTransactionById(id);
    if (transaction.borrowUserId === req.user.userId) {
      await this.transactionService.updateStatus(id, {status: TransactionStatus.FINSHED_TRANSACTION}, false);
      await this.bookService.rateBook(transaction.userBook.userId, 0);
      return await this.transactionService.updateLentUserRating(id, { lentUserRating: 0 });
    } else if (transaction.userBook.userId === req.user.userId) {
      await this.transactionService.updateStatus(id, {status: TransactionStatus.FINSHED_TRANSACTION}, false);
      await this.bookService.rateBook(transaction.borrowUserId, 0);
      return await this.transactionService.updateBorrowUserRating(id, { borrowUserRating : 0 });
    } else {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }

  @Patch('bookRate/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateBookRating(@Request() req: any, @Param('id') id: string, @Body() updateBookRatingDto: UpdateBookRatingDto) {
    const transaction = await this.transactionService.getTransactionById(id);
    if (transaction && transaction.status !== TransactionStatus.FINSHED_TRANSACTION){
      throw new HttpException("Can't rate The Book if Transaction has'nt finished successfuly", HttpStatus.BAD_REQUEST);
    }
    if (transaction && (transaction.borrowUserId === req.user.userId )) {
      await this.bookService.rateBook(transaction.userBook.bookId, updateBookRatingDto.bookRating);
      return await this.transactionService.updateBookRating(id, updateBookRatingDto);
    }
    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  }

  @Patch('/borrowUserRate/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateBorrowUserRating(@Request() req: any, @Param('id') id: string, @Body() updateBorrowUserRatingDto: UpdateBorrowUserRatingDto) {
    const transaction = await this.transactionService.getTransactionById(id);
    if (transaction && transaction.status !== TransactionStatus.FINSHED_TRANSACTION){
      throw new HttpException("Can't rate The User if Transaction hasn't finished successfuly", HttpStatus.BAD_REQUEST);
    }
    if (transaction && transaction.userBook.userId === req.user.userId) {
      await this.userService.rateUser(transaction.borrowUserId, updateBorrowUserRatingDto.borrowUserRating);
      return await this.transactionService.updateBorrowUserRating(id, updateBorrowUserRatingDto);
    }
    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  }
  
  @Patch('/lentUserRate/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateLentUserRating(@Request() req: any, @Param('id') id: string, @Body() updateLentUserRatingDto : UpdatelentUserRatingDto) {
    const transaction = await this.transactionService.getTransactionById(id);
    if (transaction && transaction.status !== TransactionStatus.FINSHED_TRANSACTION){
      throw new HttpException("Can't rate The User if Transaction hasn't finished successfuly", HttpStatus.BAD_REQUEST);
    }
    if (transaction && transaction.borrowUserId === req.user.userId) {
      await this.userService.rateUser(transaction.userBook.userId, updateLentUserRatingDto.lentUserRating);
      return this.transactionService.updateLentUserRating(id, updateLentUserRatingDto);
    }
    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  }
}
