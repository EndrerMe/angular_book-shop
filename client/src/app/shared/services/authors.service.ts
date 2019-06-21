// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environmets
import { environment } from 'src/environments/environment';
// Models
import { PaginationModel } from 'src/app/shared/models';
// Interfaces 
import { IAuthor } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private http: HttpClient
  ) {}

  public getAllAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${environment.mongodb.databaseURL}/authors/getAllAuthors`);
  }

  public addNewAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(`${environment.mongodb.databaseURL}/authors/addNewAuthor`, author);
  }

  public paging(paging: PaginationModel): Observable<IAuthor[]> {
    return this.http.post<IAuthor[]>(`${environment.mongodb.databaseURL}/authors/paging`, paging);
  }

  public getTotal(): Observable<number> {
    return this.http.get<number>(`${environment.mongodb.databaseURL}/authors/getTotal`);
  }

  public changeAuthorName(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(`${environment.mongodb.databaseURL}/authors/changeAuthorName`, author);
  }

  public deleteAuthor(author: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(`${environment.mongodb.databaseURL}/authors/deleteAuthor`, author);
  }
}
