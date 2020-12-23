import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
