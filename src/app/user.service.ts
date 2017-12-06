import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  baseUrl = 'http://ponyracer.ninja-squad.com';
  userEvents = new Subject<UserModel>();

  constructor(private http: HttpClient) {}

  register(login, password, birthYear): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(`${this.baseUrl}/api/users`, body);
  }

  authenticate(crendentials): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${this.baseUrl}/api/users/authentication`, crendentials)
      .do(user => this.userEvents.next(user));
  }
}
