// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environmets
import { environment } from 'src/environments/environment';
// Models
import { IAuthor } from 'src/app/shared/interfaces';
import { PaginationModel } from '../models/paginat.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private http: HttpClient
  ) {}

  public getAllAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${environment.apiUrl}/authors/getAllAuthors`)
  }

  public addNewAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(`${environment.apiUrl}/authors/addNewAuthor`, author)
  }

  public paging(paging: PaginationModel): Observable<IAuthor[]> {
    return this.http.post<IAuthor[]>(`${environment.apiUrl}/authors/paging`, paging)
  }

  public getTotal(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/authors/getTotal`)
  }

  public changeAuthorName(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(`${environment.apiUrl}/authors/changeAuthorName`, author)
  }

  public deleteAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(`${environment.apiUrl}/authors/deleteAuthor`, author)
  }
}
