import { SnackbarService } from './../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as authActions from './../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  signup(): void {
    if (this.signupForm.valid) {
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      const displayName =
        this.signupForm.value.name + ' ' + this.signupForm.value.surname;
      this.store.dispatch(authActions.signup({ email, password, displayName }));
    } else {
      console.log('Signup forms values => ', this.signupForm.value);
    }
  }

  googleSignup(): void {
    this.store.dispatch(authActions.googleLogin());
  }

  facebookSignup(): void {
    this.snackbar.warning('Feature is in Development');
  }

  private initForm(): void {
    this.signupForm = this.formBuilder.group({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          this.validatePassword.bind(this),
        ])
      ),
      dateOfBirth: new FormControl(),
    });
  }

  private validatePassword(
    passwordField: FormControl
  ): { [errorCode: string]: boolean } {
    if (this.signupForm) {
      return passwordField.value === this.signupForm.value.password
        ? null
        : { notMatch: true };
    }
    return null;
  }
}
