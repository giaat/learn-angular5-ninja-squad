import { Component } from '@angular/core';

import { RaceModel } from '../../models/race.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pr-finished-races',
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css'],
})
export class FinishedRacesComponent {
  races: Array<RaceModel>;

  constructor(private route: ActivatedRoute) {
    this.races = route.snapshot.data['races'];
  }
}
