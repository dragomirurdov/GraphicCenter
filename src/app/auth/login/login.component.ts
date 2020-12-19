import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { SnackbarService } from './../../shared/services/snackbar.service';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';
import { User } from '../models';

import * as authActions from './../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackbar: SnackbarService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      const email = value.email;
      const password = value.password;
      this.store.dispatch(authActions.emailLogin({ email, password }));
    } else {
      this.snackbar.warning('Please enter valid credentials', 'Dismiss');
    }
  }

  googleLogin(): void {
    this.store.dispatch(authActions.googleLogin());
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
