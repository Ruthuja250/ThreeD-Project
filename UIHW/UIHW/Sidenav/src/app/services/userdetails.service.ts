import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  readonly rootUrl = 'https://localhost:7250/api/Users/';
  constructor(private http: HttpClient) {}

  GetUser(): Observable<User[]> {
    return this.http.get<User[]>(this.rootUrl);
  }

  GetUserById(id: number): Observable<User> {
    return this.http.get<User>(this.rootUrl + '/api/User' + id);
  }
  // AddUserModels(UserModel: UserModel): Observable<UserModel> {
  //   return this.http.post<UserModel>(this.rootUrl+'register', UserModel);
  // }

  DeleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.rootUrl + id);
  }

  UpdateUser(id: number, UserModel: User): Observable<User> {
    return this.http.put<User>(this.rootUrl+ id, UserModel);
  }

}
