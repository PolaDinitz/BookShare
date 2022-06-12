import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBookDto } from "../book/dto/create-book.dto";
import { Repository } from "typeorm";
import { UpdateUserBookAvailabilityDto } from "./dto/update-user-book-availability.dto";
import { UserBook } from "./entities/user-book.entity";

@Injectable()
export class UserBookService {

    constructor(
        @InjectRepository(UserBook)
        private userBookRepository: Repository<UserBook>
    ) {
    }

    public async getUserBooks(): Promise<UserBook[]> {
        return await this.userBookRepository.find({
            relations: ["user"]
        });
    }

    public async getUserBookById(id: string): Promise<UserBook> {
        return await this.userBookRepository.findOne(id, {
            relations: ["user"]
        });
    }

    public async create(createBookDto: CreateBookDto): Promise<UserBook> {
        return await this.userBookRepository.save(this.userBookRepository.create({
            userId: createBookDto.userId,
            bookId: createBookDto.bookId,
            isAvailable: createBookDto.isAvailable
        }));
    }

    public async delete(id: string) {
        return await this.userBookRepository.delete(id);
    }

    public async getUserBooksByUser(userId: string) {
        return await this.userBookRepository.find({
            where: {
                userId: userId
            },
            relations: [
                "book"
            ]
        });
    }

    public async getAvailableUserBooksByBook(id: string) {
        return await this.userBookRepository.find({
            where: {
                bookId: id,
                isAvailable: true,
                isLent: false
            },
            relations: [
                "user"
            ]
        });
    }

    public async getAvailableUserBooks() {
        return await this.userBookRepository.find({
            where: {
                isAvailable: true,
                isLent: false
            },
            relations: [
                "user"
            ]
        });
    }

    public async updateUserBookAvailability(id: string, updateUserBookAvailabilityDto: UpdateUserBookAvailabilityDto) {
        return await this.userBookRepository.save({
            id: id,
            isAvailable: updateUserBookAvailabilityDto.isAvailable
        });
    }

    public async updateUserBookLent(id: string, isLent: boolean) {
        return await this.userBookRepository.save({
            id: id,
            isLent: isLent
        });
    }
}
