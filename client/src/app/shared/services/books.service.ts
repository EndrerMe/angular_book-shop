// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environment
import { environment } from 'src/environments/environment';
// Models
import { BookModel } from 'src/app/shared/models';
import { FilterModel } from 'src/app/shared/models';
import { PaginationModel } from 'src/app/shared/models';

@Injectable()
export class BooksService {
  constructor(
      private http: HttpClient
  ) {
  }

  public getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${environment.mongodb.databaseURL}/books/getBooks`);
  }

  public getBookById(id: string): Observable<BookModel> {
    return this.http.get<BookModel>(`${environment.mongodb.databaseURL}/books/getById/` + id);
  }

  public addNewBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.mongodb.databaseURL}/books/addNewBook`, book);
  }

  public deleteBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.mongodb.databaseURL}/books/deleteBook`, book);
  }

  public changeBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.mongodb.databaseURL}/books/changeBook`, book);
  }

  public searchByTitle(book: FilterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/searchByTitle`, book);
  }

  public searchByAuthor(author: FilterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/searchByAuthor`, author);
  }

  public searchByType(type: FilterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/searchByType`, type);
  }

  public searchByPrice(price: FilterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/searchByPrice`, price);
  }

  public paging(page: PaginationModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.mongodb.databaseURL}/books/paging`, page);
  }

  public getTotal(): Observable<number> {
    return this.http.get<number>(`${environment.mongodb.databaseURL}/books/getTotal`);
  }
}
