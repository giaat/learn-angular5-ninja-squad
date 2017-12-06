import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  baseUrl = 'http://ponyracer.ninja-squad.com';
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient) {
    this.retrieveUser();
  }

  register(login, password, birthYear): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(`${this.baseUrl}/api/users`, body);
  }

  authenticate(crendentials): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${this.baseUrl}/api/users/authentication`, crendentials)
      .do(user => this.storeLoggedInUser(user));
  }

  storeLoggedInUser(user) {
    this.userEvents.next(user);
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
  }

  retrieveUser() {
    const rememberMe = window.localStorage.getItem('rememberMe');
    if (rememberMe) {
      const user = JSON.parse(rememberMe);
      this.userEvents.next(user);
    }
  }

  logout() {
    this.userEvents.next(null);
    localStorage.removeItem('rememberMe');
  }
}
