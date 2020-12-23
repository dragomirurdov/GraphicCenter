import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/auth/models';
import { ThemingService } from './../../shared/services/theming.service';

import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as authActions from './../../auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  selectedTheme: string;
  user: Observable<User>;

  constructor(
    private theme: ThemingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.theme.activeTheme.subscribe((theme) => {
      this.selectedTheme = theme;
    });
    this.user = this.store.select(fromApp.selectUser);
  }

  changeTheme(theme: string): void {
    this.theme.changeTheme(theme);
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
