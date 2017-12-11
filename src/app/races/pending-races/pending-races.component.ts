import { Component, OnInit } from '@angular/core';

import { RaceModel } from '../../models/race.model';
import { RaceService } from '../../race.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pr-pending-races',
  templateUrl: './pending-races.component.html',
  styleUrls: ['./pending-races.component.css'],
})
export class PendingRacesComponent implements OnInit {
  races: Array<RaceModel> = [];
  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => (this.races = data['races']));
  }
}
