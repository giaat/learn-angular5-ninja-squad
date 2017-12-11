import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import { HttpClient } from '@angular/common/http';

import { RaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';
import { environment } from '../environments/environment';
import { WsService } from './ws.service';

@Injectable()
export class RaceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private wsService: WsService) {}

  list(status: string): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>(`${this.baseUrl}/api/races`, {
      params: { status },
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
    return this.wsService
      .connect(`/race/${raceId}`)
      .takeWhile(liveRace => liveRace.status !== 'FINISHED')
      .map(liveRace => liveRace.ponies);
  }

  boost(raceId, ponyId) {
    return this.http.post(`${this.baseUrl}/api/races/${raceId}/boosts`, { ponyId });
  }
}
