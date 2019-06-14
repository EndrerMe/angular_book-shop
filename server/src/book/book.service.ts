// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Interfaces
import { IBook } from './interfaces/IBook';
import { BookDTO } from './dto/book.dto';


@Injectable()
export class BookService {
    constructor(
        @InjectModel("Books") private readonly bookModel: Model<IBook>,
    ) {
        
    }

    public async findBookById(id: string): Promise<IBook> {
        return await this.bookModel.findOne({_id: id})
    }

    public async findBookByName(title: BookDTO): Promise<IBook[]> {
        const bookByName = this.bookModel.find({name: title.title})
        return await bookByName
    }

    public async findBookByAuthor(author: BookDTO): Promise<IBook[]> {
        const bookByAuthor = this.bookModel.find({authors: {$elemMatch : {name: author.author}}})
        return await bookByAuthor
    }

    public async findBookByType(type: BookDTO): Promise<IBook[]> {
        const bookByType = this.bookModel.find({type: type.type})
        return await bookByType
    }

    public async findBookByPrice(price: BookDTO): Promise<IBook[]> {
        const bookByPrice = this.bookModel.find({$and : [{price: {$gt : price.min}}, {price: {$lt : price.max}}]})
        return await bookByPrice
    }

    public async getBooks(): Promise<IBook[]> {
        return await this.bookModel.find().exec();
    }

    public async getTotal(): Promise<{}> {
        const total = this.bookModel.find().count()
        return total
    }

    public async paging(page: number): Promise<IBook[]> {
        const perPage = 5;
        const start = (page - 1) * perPage;
        const booksOnPage = this.bookModel.find().skip(start).limit(perPage)
        return booksOnPage
    }

    public async addNewBook(book: any): Promise<IBook> {
        const isBook = await this.findBookByName(book.newBookTitle);
        if(isBook.length !== 0) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Book is already exists"
            }, 403);
        }

        if(isBook.length === 0) {
            let createdBook: IBook = {
                name: book.newBookTitle,
                authors: book.newBookAuthor,
                description: book.newBookInfo,
                type: book.newBookType,
                price: book.newBookPrice
            }

            let newBook = new this.bookModel(createdBook)
            return newBook.save()
        }
    }

    public async deleteBook(book): Promise<IBook> {
        const isBook = this.findBookById(book.id)

        if (!isBook) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Book not found"
            }, 404);
        }   

        if (isBook) {
            return this.bookModel.remove({_id: book.id})
        }
    }

    public async changeBook(book): Promise<IBook> {
        const isBook = this.findBookById(book.id)

        if (!isBook) {
            console.log("no")
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Password is worng"
            }, 404);
        }

        if (isBook) {
            console.log("yes")
            return this.bookModel.updateOne({_id: book.id}, book)
        }
    }
}
