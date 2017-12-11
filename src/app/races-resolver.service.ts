import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RaceModel } from './models/race.model';
import { RaceService } from './race.service';

@Injectable()
export class RacesResolverService implements Resolve<Array<RaceModel>> {
  constructor(private raceService: RaceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<RaceModel>> {
    const type = route.routeConfig.path.toUpperCase();
    return this.raceService.list(type);
  }
}
