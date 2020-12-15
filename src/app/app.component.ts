import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'graphic-center';
  image: string;

  @HostBinding('class') themeClass: string;

  private subs = new SubSink();

  constructor(private authService: AuthService) {
    authService.initUser();
    // this.subs.add(
    //   this.authService.user.subscribe((user) => {
    //     this.image = user.photoURL;
    //   })
    // );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
