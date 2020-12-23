import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models';
import { AppState } from 'src/app/store/app.reducer';

import * as fromApp from './../../store/app.reducer';
import * as authActions from './../../auth/store/auth.actions';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  user: Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user = this.store.select(fromApp.selectUser);
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
