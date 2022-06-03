import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateBookRatingDto } from "./dto/update-book-rating.dto";
import { UpdateUserRatingDto } from "./dto/update-user-rating.dto";
import { UpdateTransactionStatusDto } from "./dto/update-transaction-status.dto";
import { Transaction } from "./entities/transaction.entity";
import { TransactionStatus } from "../../enums/transaction-status.enum";

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ) {
  }

  public async create(createTransactionDto: CreateTransactionDto) {
    return await this.transactionRepository.save(this.transactionRepository.create({
      startDate: new Date(),
      borrowUserId: createTransactionDto.borrowUserId,
      userBookId: createTransactionDto.userBookId
    }));
  }

  public async getTransactions() {
    return this.transactionRepository.find({
      relations: ["borrowUser", "userBook", "userBook.user", "userBook.book", "chatMessages"]
    });
  }

  public async getTransactionById(id: string) {
    return this.transactionRepository.findOne(id, {
      relations: ["borrowUser", "userBook", "userBook.user", "userBook.book", "chatMessages"]
    });
  }

  public async updateStatus(id: string, updateTransactionStatusDto: UpdateTransactionStatusDto, active: boolean) {
    return this.transactionRepository.save({
      id: id,
      ...updateTransactionStatusDto,
      active: active
    });
  }

  public async updateBookRating(id: string, updateBookRatingDto: UpdateBookRatingDto) {
    return this.transactionRepository.save({
      id: id,
      bookRating: updateBookRatingDto.bookRating
    });
  }

  public async updateBorrowUserRating(id: string, updateUserRatingDto: UpdateUserRatingDto) {
    return this.transactionRepository.save({
      id: id,
      borrowUserRating: updateUserRatingDto.userRating
    });
  }

  public async updateLentUserRating(id: string, updateUserRatingDto: UpdateUserRatingDto) {
    return this.transactionRepository.save({
      id: id,
      lentUserRating: updateUserRatingDto.userRating
    });
  }

  public async getLastTransactionsByBorrowUser(id: string, limit: number) {
    return this.transactionRepository.find({
      where: {
        borrowUserId: id
      },
      relations: ["borrowUser", "userBook", "userBook.user", "userBook.book", "chatMessages"],
      order: {
        startDate: "DESC"
      },
      take: limit,
    });
  }

  public async getTransactionsByBorrowUser(id: string) {
    return this.transactionRepository.find({
      where: {
        borrowUserId: id
      },
      relations: ["borrowUser", "userBook", "userBook.user", "userBook.book", "chatMessages"]
    });
  }

  public async getTransactionsByUserId(id: string) {
    const lentTransactions = await this.getTransactionsByLentUser(id);
    const borrowedTransactions = await this.getTransactionsByBorrowUser(id);
    return [...lentTransactions, ...borrowedTransactions];
  }

  public async getTransactionsWithChatAvailableByUserId(id: string) {
    const transactionStatusWithChatAvailable = [TransactionStatus.WAITING_FOR_BOOK_RETURNED, TransactionStatus.WAITING_FOR_LEND];
    const lentTransactions = await this.getTransactionsByLentUser(id);
    const borrowedTransactions = await this.getTransactionsByBorrowUser(id);
    return [
      ...lentTransactions.filter((transaction) => transactionStatusWithChatAvailable.includes(transaction.status)),
      ...borrowedTransactions.filter((transaction) => transactionStatusWithChatAvailable.includes(transaction.status))
    ];
  }

  public async getTransactionsByLentUser(id: string) {
    return this.transactionRepository.find({
      where: {
        userBook: {
          user: {
            id: id
          }
        }
      },
      relations: ["borrowUser", "userBook", "userBook.user", "userBook.book", "chatMessages"]
    });
  }

  public async getActiveTransactionsByUserBook(id: string) {
    return this.transactionRepository.find({
      where: {
        userBook: {
          id: id
        },
        active: true
      },
      relations: ["userBook"]
    });
  }

  public async getTransactionByUserBookAndBorrowUser(userBookId: string, borrowUserId: string) {
    return await this.transactionRepository.find({
      where: {
        userBook: {
          id: userBookId
        },
        active: true,
        borrowUserId: borrowUserId
      }
    });
  }

  public async deactivateOtherTransactionsByUserBook(userBookId: string, currentTransactionId: string) {
    return this.transactionRepository.createQueryBuilder()
      .update()
      .set({ active: false })
      .where("userBookId = :userBookId")
      .andWhere("id != :id")
      .setParameters({ userBookId: userBookId, id: currentTransactionId })
      .execute();
  }
}
