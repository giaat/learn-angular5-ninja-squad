import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  navbarCollapsed = true;
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents
      .switchMap(
        user =>
          user
            ? Observable.of(user).concat(
                this.userService.scoreUpdates(user.id).catch(() => Observable.empty())
              )
            : Observable.of(null)
      )
      .subscribe(userScore => (this.user = userScore));
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }

  logout(event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
