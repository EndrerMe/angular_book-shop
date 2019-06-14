// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environment
import { environment } from 'src/environments/environment';
// Models
import { BookModel } from 'src/app/shared/models';
import { filterModel } from '../models/filter.model';
import { PaginationModel } from '../models/paginat.model';

@Injectable()
export class BooksService {
  constructor(
      private http: HttpClient
  ) {
  
  }

  public getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${environment.apiUrl}/books/getBooks`)
  }

  public getBookById(id: string): Observable<BookModel> {
    return this.http.get<BookModel>(`${environment.apiUrl}/books/getById/` + id)
  }

  public addNewBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.apiUrl}/books/addNewBook`, book)
  }

  public deleteBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.apiUrl}/books/deleteBook`, book)
  }

  public changeBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.apiUrl}/books/changeBook`, book)
  }

  public searchByTitle(book: filterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.apiUrl}/books/searchByTitle`, book)
  }

  public searchByAuthor(author: filterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.apiUrl}/books/searchByAuthor`, author)
  }

  public searchByType(type: filterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.apiUrl}/books/searchByType`, type)
  }

  public searchByPrice(price: filterModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.apiUrl}/books/searchByPrice`, price)
  }

  public paging(page: PaginationModel): Observable<BookModel[]> {
    return this.http.post<BookModel[]>(`${environment.apiUrl}/books/paging`, page)
  }

  public getTotal(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/books/getTotal`)
  }

  
}
