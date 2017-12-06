import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  baseUrl = 'http://ponyracer.ninja-squad.com';
  constructor(private http: HttpClient) {}

  register(login, password, birthYear): Observable<any> {
    const body = { login, password, birthYear };
    return this.http.post(`${this.baseUrl}/api/users`, body);
  }
  authenticate(crendentials): Observable<any> {
    const body = crendentials;
    return this.http.post(`${this.baseUrl}/api/users/authentication`, body);
  }
}
