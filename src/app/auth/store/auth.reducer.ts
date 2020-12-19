import { createReducer, on } from '@ngrx/store';
import { User } from '../models';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  loading: boolean;
  error: string;
}

const initialState: State = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.getUser, (state) => {
    return { ...state, loading: true };
  }),
  on(AuthActions.authenticated, (state, props) => {
    return {
      ...state,
      user: props,
      loading: false,
      error: null,
    };
  }),
  on(AuthActions.notAuthenticated, (state) => {
    return {
      ...state,
      ...initialState,
      loading: false,
    };
  }),
  on(AuthActions.emailLogin, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(AuthActions.googleLogin, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(AuthActions.error, (state, props) => {
    return {
      ...state,
      error: props.error,
      loading: false,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
      loading: false,
      error: null,
    };
  })
);
