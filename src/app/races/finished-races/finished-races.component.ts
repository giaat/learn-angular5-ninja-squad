import { Component, OnInit } from '@angular/core';

import { RaceModel } from '../../models/race.model';
import { RaceService } from '../../race.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pr-finished-races',
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css'],
})
export class FinishedRacesComponent implements OnInit {
  races: Array<RaceModel> = [];
  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => (this.races = data['races']));
  }
}
