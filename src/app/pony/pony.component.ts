import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css'],
})
export class PonyComponent implements OnInit {
  @Input() ponyModel: PonyModel;
  @Output() ponyClicked = new EventEmitter<PonyModel>();
  @Input() isRunning: boolean;
  @Input() isBoosted: boolean;

  constructor() {}

  ngOnInit() {}

  getPonyImageUrl() {
    if (this.isRunning) {
      if (this.isBoosted) {
        return `assets/images/pony-${this.ponyModel.color.toLowerCase()}-rainbow.gif`;
      } else {
        return `assets/images/pony-${this.ponyModel.color.toLowerCase()}-running.gif`;
      }
    }

    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`;
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }
}
