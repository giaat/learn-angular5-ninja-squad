import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RACES_ROUTES } from './races.routes';
import { RacesComponent } from '../races/races.component';
import { PendingRacesComponent } from '../races/pending-races/pending-races.component';
import { FinishedRacesComponent } from '../races/finished-races/finished-races.component';
import { PonyComponent } from '../pony/pony.component';
import { BetComponent } from '../bet/bet.component';
import { LiveComponent } from '../live/live.component';
import { FromNowPipe } from '../from-now.pipe';
import { RaceComponent } from '../race/race.component';
import { RaceService } from '../race.service';
import { RacesResolverService } from '../races-resolver.service';
import { RaceResolverService } from '../race-resolver.service';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RACES_ROUTES)],
  declarations: [
    RacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
    BetComponent,
    LiveComponent,
    PendingRacesComponent,
    FinishedRacesComponent,
  ],
  providers: [RaceService, RacesResolverService, RaceResolverService],
})
export class RacesModule {}
