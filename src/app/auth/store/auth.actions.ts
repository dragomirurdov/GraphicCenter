import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export const getUser = createAction('[Auth] Get user');

export const authenticated = createAction(
  '[Auth] Authenticated',
  props<User>()
);

export const notAuthenticated = createAction('[Auth] Not Authenticated');

export const emailLogin = createAction(
  '[Auth] Email login',
  props<{ email: string; password: string }>()
);

export const googleLogin = createAction('[Auth] Google login');

export const logout = createAction('[Auth] Logout');

export const error = createAction('[Auth] Error', props<{ error: string }>());
