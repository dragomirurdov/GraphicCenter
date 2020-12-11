import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<firebase.User>();

  constructor(private auth: AngularFireAuth) {}

  initUser() {
    this.auth.user.subscribe((user) => {
      console.log(user);
      this.user.next(user);
      if (user) {
      }
    });
  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password);
  }

  googleLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
