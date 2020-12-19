import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromAuth from './../auth/store/auth.reducer';

export interface AppState {
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
};

export const selectAuth = (state: AppState) => state.auth;

export const selectUser = createSelector(
  selectAuth,
  (state: fromAuth.State) => state.user
);
