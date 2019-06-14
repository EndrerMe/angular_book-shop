// Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';
// Models
import { IUser } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public paging(paging): Observable<IUser[]> {
    return this.http.post<IUser[]>(`${environment.apiUrl}/users/paging`, paging)
  }

  public deleteUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/users/deleteUser`, user)
  }

  public changeUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/users/changeUser`, user)
  }

  public getTotal(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/users/getTotal`)
  }
  
}
