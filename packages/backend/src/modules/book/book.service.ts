import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./entities/book.entity";

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>
    ) {
    }

    public async getBooks(): Promise<Book[]> {
        return await this.booksRepository.find({
            relations: ["categories"]
        });
    }

    public async getBookById(id: string): Promise<Book> {
        return await this.booksRepository.findOne(id);
    }

    public async getBooksByTitle(title: string): Promise<Book[]> {
        return await this.booksRepository.createQueryBuilder()
            .where("title like :search", {search: `${title}%`})
            .getMany();
    }

    public async getBooksByAuthor(author: string): Promise<Book[]> {
        return await this.booksRepository.find({
            where: {author: author}
        });
    }

    public async getBooksByRating(rating: number): Promise<Book[]> {
        return await this.booksRepository.createQueryBuilder()
            .where("bookRating > :rating", {rating: rating})
            .getMany();
    }

    public async rateBook(id: string, rating: number) {
        const bookToRate = await this.getBookById(id);

        return await this.booksRepository.update(id, {
            bookRating: bookToRate.bookRating + rating,
            count: bookToRate.count + 1
        });
    }

    public async getBookRating(id: string) {
        const book = await this.getBookById(id);
        if (book.count === 0) {
            return {rating: -1};
        }
        return {rating: (book.bookRating / book.count)};
    }

    public async create(bookApi: BookApi): Promise<Book> {
        const newBook = this.booksRepository.create({
            id: bookApi.id,
            author: bookApi.author,
            bookRating: 0,
            count: 0,
            description: bookApi.description,
            title: bookApi.title,
            imageUrl: bookApi.imageUrl
        });
        return await this.booksRepository.save(newBook);
    }
}
