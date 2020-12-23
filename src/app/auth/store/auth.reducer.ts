import { createReducer, on } from '@ngrx/store';
import { User } from '../models';
import * as authActions from './auth.actions';

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
  on(authActions.getUser, (state) => {
    return { ...state, loading: true };
  }),
  on(authActions.authenticated, (state, props) => {
    return {
      ...state,
      user: props,
      loading: false,
      error: null,
    };
  }),
  on(authActions.notAuthenticated, (state) => {
    return {
      ...state,
      ...initialState,
      loading: false,
    };
  }),
  on(authActions.emailLogin, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(authActions.googleLogin, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(authActions.signup, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(authActions.error, (state, props) => {
    return {
      ...state,
      error: props.error,
      loading: false,
    };
  }),
  on(authActions.logout, (state) => {
    return {
      ...state,
      user: null,
      loading: false,
      error: null,
    };
  })
);
