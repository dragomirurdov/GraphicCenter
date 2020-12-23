import { props } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';
import { of, from, throwError } from 'rxjs';

import { SnackbarService } from './../../shared/services';
import { User } from '../models';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, delay, tap, take } from 'rxjs/operators';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private auth: AngularFireAuth,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  getUser = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.getUser),
      switchMap(() => {
        return this.auth.authState.pipe(take(1));
      }),
      map((authData) => {
        if (authData) {
          const user = new User(
            authData.uid,
            authData.email,
            authData.displayName,
            authData.photoURL
          );
          return authActions.authenticated(user);
        } else {
          return authActions.notAuthenticated();
        }
      }),
      catchError((err) => {
        return of(authActions.error({ error: err.message }));
      })
    )
  );

  emailLogin = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.emailLogin),
      switchMap((props) => {
        return from(this.loginWithEmail(props.email, props.password));
      }),
      map(() => {
        return authActions.getUser();
      }),
      catchError((err) => {
        return of(authActions.error({ error: err.message }));
      })
    )
  );

  googleLogin = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.googleLogin),
      switchMap(() => {
        return from(this.loginWithGoogle());
      }),
      map(() => {
        return authActions.getUser();
      }),
      catchError((err) => {
        return of(authActions.error({ error: err.message }));
      })
    )
  );

  signup = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.signup),
      switchMap((payload) => {
        return from(
          this.createUser(
            payload.email,
            payload.password,
            payload.displayName,
            payload?.photoUrl
          )
        );
      }),
      map(() => {
        return authActions.getUser();
      }),
      catchError((err) => {
        return of(authActions.error({ error: err.message }));
      })
    )
  );

  loginRedirect = createEffect(
    () =>
      this.actions.pipe(
        ofType(authActions.authenticated),
        tap(() => {
          this.router.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.logout),
      switchMap(() => {
        return of(this.auth.signOut());
      }),
      map(() => {
        return authActions.notAuthenticated();
      }),
      catchError((err) => of(authActions.error({ error: err.message })))
    )
  );

  error = createEffect(
    () =>
      this.actions.pipe(
        ofType(authActions.error),
        tap((payload) => {
          this.snackbar.error(payload.error);
        })
      ),
    { dispatch: false }
  );

  private createUser(
    email: string,
    password: string,
    displayName: string,
    photoURL?: string
  ): Promise<void> {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName,
          photoURL,
        });
      });
  }

  private loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider);
  }

  private loginWithEmail(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
}
