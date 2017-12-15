import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RACES_ROUTES } from './races.routes';
import { BetComponent } from '../bet/bet.component';
import { LiveComponent } from '../live/live.component';
import { RacesComponent } from '../races/races.component';
import { PendingRacesComponent } from '../races/pending-races/pending-races.component';
import { FinishedRacesComponent } from '../races/finished-races/finished-races.component';
import { RaceComponent } from '../race/race.component';
import { PonyComponent } from '../pony/pony.component';
import { FromNowPipe } from '../from-now.pipe';
import { RaceService } from '../race.service';
import { RacesResolverService } from '../races-resolver.service';
import { RaceResolverService } from '../race-resolver.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RACES_ROUTES), SharedModule],
  declarations: [
    BetComponent,
    LiveComponent,
    RacesComponent,
    PendingRacesComponent,
    FinishedRacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
  ],
  providers: [RaceService, RacesResolverService, RaceResolverService],
})
export class RacesModule {}
