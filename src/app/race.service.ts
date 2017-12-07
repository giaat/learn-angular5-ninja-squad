import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { HttpClient } from '@angular/common/http';

import { RaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';
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

  bet(raceId, ponyId): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${this.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }

  get(raceId): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${this.baseUrl}/api/races/${raceId}`);
  }

  cancelBet(raceId): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId): Observable<Array<PonyWithPositionModel>> {
    return Observable.interval(1000)
      .take(101)
      .map(position => {
        return [
          {
            id: 1,
            name: 'Superb Runner',
            color: 'BLUE',
            position,
          },
          {
            id: 2,
            name: 'Awesome Fridge',
            color: 'GREEN',
            position,
          },
          {
            id: 3,
            name: 'Great Bottle',
            color: 'ORANGE',
            position,
          },
          {
            id: 4,
            name: 'Little Flower',
            color: 'YELLOW',
            position,
          },
          {
            id: 5,
            name: 'Nice Rock',
            color: 'PURPLE',
            position,
          },
        ];
      });
  }
}
