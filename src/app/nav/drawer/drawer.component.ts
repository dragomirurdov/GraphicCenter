import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromApp from './../../store/app.reducer';
import { User } from 'src/app/auth/models';
@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  user: Observable<User>;

  @Output() closeDrawer = new EventEmitter<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user = this.store.select(fromApp.selectUser);
  }
}
