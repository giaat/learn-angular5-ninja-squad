import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import { HttpClient } from '@angular/common/http';

import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { WsService } from './ws.service';

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;
  userEvents = new BehaviorSubject<UserModel>(undefined);

  constructor(
    private http: HttpClient,
    private jwtInterceptorService: JwtInterceptorService,
    private wsService: WsService
  ) {
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
    this.jwtInterceptorService.setJwtToken(user.token);
  }

  retrieveUser() {
    const rememberMe = window.localStorage.getItem('rememberMe');
    if (rememberMe) {
      const user = JSON.parse(rememberMe);
      this.userEvents.next(user);
      this.jwtInterceptorService.setJwtToken(user.token);
    }
  }

  logout() {
    this.userEvents.next(null);
    localStorage.removeItem('rememberMe');
    this.jwtInterceptorService.removeJwtToken();
  }

  scoreUpdates(userId): Observable<UserModel> {
    return this.wsService.connect(`/player/${userId}`);
  }

  isLoggedIn() {
    const rememberMe = window.localStorage.getItem('rememberMe');
    if (rememberMe) {
      return true;
    }
    return false;
  }
}
