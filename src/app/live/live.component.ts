import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';

import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css'],
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription;
  error = false;
  winners: Array<PonyWithPositionModel>;
  betWon: boolean;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('raceId');
    this.positionSubscription = this.raceService
      .get(id)
      .do(race => (this.raceModel = race))
      .filter(race => race.status !== 'FINISHED')
      .switchMap(race => this.raceService.live(race.id))
      .subscribe(
        positions => {
          this.poniesWithPosition = positions;
          this.raceModel.status = 'RUNNING';
        },
        error => {
          this.error = true;
          console.error(error);
        },
        () => {
          this.raceModel.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(pony => pony.id === this.raceModel.betPonyId);
        }
      );
  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }
}
