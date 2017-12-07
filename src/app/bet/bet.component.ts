import { Component, OnInit, Input } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css'],
})
export class BetComponent implements OnInit {
  raceModel: RaceModel;
  betFailed = false;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(id).subscribe(race => (this.raceModel = race));
  }

  betOnPony(pony) {
    if (pony.id === this.raceModel.betPonyId) {
      this.raceService
        .cancelBet(this.raceModel.id)
        .subscribe(() => (this.raceModel.betPonyId = null), () => (this.betFailed = true));
    } else {
      this.raceService
        .bet(this.raceModel.id, pony.id)
        .subscribe(race => (this.raceModel = race), () => (this.betFailed = true));
    }
  }

  isPonySelected(pony) {
    if (pony.id === this.raceModel.betPonyId) {
      return true;
    }
  }
}
