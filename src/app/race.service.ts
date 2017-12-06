import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';

@Injectable()
export class RaceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>(`${this.baseUrl}/api/races`, {
      params: { status: 'PENDING' },
    });
  }
}
