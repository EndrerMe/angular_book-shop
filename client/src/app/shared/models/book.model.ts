import { IAuthor } from '../interfaces';

export class BookModel {
    id: string;
    name: string;
    description: string;
    price: number;
    type: string;
    authors: IAuthor[];
    value: number = 1;
}
