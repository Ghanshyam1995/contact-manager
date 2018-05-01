import { User } from './../../models/user';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../services/user.service';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
const SMALL_SCREEN_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  users: Observable<User[]>;
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${SMALL_SCREEN_BREAKPOINT}px)`)
  constructor(zone: NgZone, private userService: UserService, private router: Router) {
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql))
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }
  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
