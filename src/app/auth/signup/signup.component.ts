import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
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
    });
  }

  ngOnInit(): void {}

  signup(): void {
    console.log(this.signupForm.controls.confirmPassword.hasError('notMatch'));
  }

  private validatePassword(
    passwordField: FormControl
  ): { [s: string]: boolean } {
    if (this.signupForm) {
      return passwordField.value === this.signupForm.value.password
        ? null
        : { notMatch: true };
    }
    return null;
  }
}
