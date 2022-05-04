import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
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
import { TransactionStatus } from 'src/enums/transaction-status.enum';
import { UserBookService } from 'src/user-book/user-book.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly userBookService: UserBookService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionService.create(createTransactionDto);
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactions() {
    return await this.transactionService.getTransactions();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactionById(@Param('id') id: string) {
    return await this.transactionService.getTransactionById(id);;
  }

  @Get('/borrowUser/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactionsByBorrowUserId(@Param('id') id: string) {
    return await this.transactionService.getTransctionsByBorrowUser(id);;
  }

  
  @Get('LentUser/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTransactionsByLentUserId(@Param('id') id: string) {
    return await this.transactionService.getTransctionsByLentUser(id);;
  }

  @Patch('/status/:id')
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
      // In waiting for chat approval the borrow user can:
      // - cancel the chat request
      // The lend user can
      // - decline chat
      // - approve chat and update state to wating for lend

      if (transaction.userBook.userId !== req.user.userId) {
        if (updateTransactionStatusDto.status !== TransactionStatus.CHAT_CANCELED) {
          throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
        }
        newActive = false;
      }
      else if (updateTransactionStatusDto.status === TransactionStatus.CHAT_DECLINED) {
        newActive = false;
      }
      else if (updateTransactionStatusDto.status !== TransactionStatus.WAITING_FOR_LEND) {
        throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
      }
    }
    else if (transaction.status === TransactionStatus.WAITING_FOR_LEND) {
      // In waiting for lent the borrow user can:
      // - cancel the chat
      // The lend user can
      // - decline lent
      // - approve lent and pass to waiting for book returnal status

      if (transaction.userBook.userId !== req.user.userId) {
        if (updateTransactionStatusDto.status !== TransactionStatus.CHAT_CANCELED) {
          throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
        }
        newActive = false;
      } else if (updateTransactionStatusDto.status === TransactionStatus.LEND_DECLINED) {
        newActive = false;
      } else if (updateTransactionStatusDto.status === TransactionStatus.WAITING_FOR_BOOK_RETURNED) {
        this.userBookService.updateUserBookLented(transaction.userBookId, true);
        this.transactionService.deactivateOtherTransactionsByUserBook(transaction.userBookId, transaction.id);
      } else {
        throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
      }
    }
    else if (transaction.status === TransactionStatus.WAITING_FOR_BOOK_RETURNED) {
      // in waiting for book returnal the borrow user can: 
      // - return the book and change the status to waiting for book return approval
      // The lent user can
      // - say the book was returned and finish the transaction

      if (transaction.userBook.userId !== req.user.userId) {
        if (updateTransactionStatusDto.status !== TransactionStatus.WAITING_FOR_RETURN_APPROVAL) {
          throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
        }
      } else if (updateTransactionStatusDto.status === TransactionStatus.FINSHED_TRANSACTION) {
        await this.userBookService.updateUserBookLented(transaction.userBookId, false);
        newActive = false;
      } else {
        throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
      }
    }
    else if (transaction.status === TransactionStatus.WAITING_FOR_RETURN_APPROVAL) {
      // in waiting for book return approval the borrow user can't do anything.
      // The lent user can
      // - approve and finish the transaction
      
      if (transaction.userBook.userId !== req.user.userId) {
        throw new HttpException("UnAuthorized", HttpStatus.UNAUTHORIZED);
      } else if (updateTransactionStatusDto.status === TransactionStatus.FINSHED_TRANSACTION) {
        await this.userBookService.updateUserBookLented(transaction.userBookId, false);
        newActive = false;
      } else {
        throw new HttpException("You can't change to this state from current state", HttpStatus.BAD_REQUEST);
      }
    }
    return await this.transactionService.updateStatus(id, updateTransactionStatusDto, newActive);
  }

  @Post('report/:id')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async reportUser(@Request() req: any, @Param('id') id: string) {
    const transaction = await this.transactionService.getTransactionById(id);
    this.transactionService.updateStatus(id, {status: TransactionStatus.FINSHED_TRANSACTION}, false);
    if (transaction.borrowUserId === req.user.id) {
      return await this.transactionService.updateLentUserRating(id, { lentUserRating: 0 });
    } else if (transaction.userBook.userId === req.user.id) {
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
      return this.transactionService.updateBorrowUserRating(id, updateBorrowUserRatingDto);
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
      return this.transactionService.updateLentUserRating(id, updateLentUserRatingDto);
    }
    throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
  }
}
