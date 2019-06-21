// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Interfaces
import { IAuthor } from './Interfaces/IBook';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectModel('Authors') private authorModel: Model<IAuthor>,
    ) {

    }

    public async findAuthorByName(authorName: string): Promise<IAuthor[]> {
        const author = this.authorModel.find({name: authorName});
        return await author;
    }

    public async findAuthorById(authorId: number): Promise<IAuthor> {
        const author = this.authorModel.findOne({_id: authorId});
        return await author;
    }

    public async addNewAuthor(author): Promise<IAuthor> {
        const isAuthor = await this.findAuthorByName(author.name);
        if (isAuthor.length !== 0) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Author is already exists',
            }, 404);
        }
        if (isAuthor.length === 0) {
            const createdAuthor = new this.authorModel(author);
            return createdAuthor.save();
        }
    }

    public async getAllAuthors(): Promise<IAuthor[]> {
        return this.authorModel.find().exec();
    }

    public async paging(page: number): Promise<IAuthor[]> {
        const perPage = 5;
        const start = (page - 1) * perPage;
        const authorsOnPage = this.authorModel.find().skip(start).limit(perPage);
        return authorsOnPage;
    }

    public async getTotal(): Promise<{}> {
        const total = this.authorModel.find().count();
        return total;
    }

    public async changeAuthorName(author: IAuthor): Promise<IAuthor> {
        const isAuthor = this.findAuthorById(author.id);

        if (!isAuthor) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Author not found',
            }, 404);
        }

        if (isAuthor) {
            return this.authorModel.updateOne({_id: author.id}, author);
        }
    }

    public async deleteAuthor(author: IAuthor): Promise<IAuthor> {
        const isAuthor = this.findAuthorById(author.id);

        if (!isAuthor) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Password is worng',
            }, 404);
        }

        if (isAuthor) {
            return this.authorModel.remove({ _id: author.id });
        }
    }
}
