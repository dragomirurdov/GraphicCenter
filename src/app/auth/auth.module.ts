import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './../material.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
})
export class AuthModule {}
