import {createAction, props} from "@ngrx/store";
import {IUser} from "../../../models/interfaces/user/user.model";

export enum UserActionsTypes {
  LoadUser = '[User load] Load User',
  UserLoadedSuccess = '[User load] User Loaded Success',
  UserLoadedError = '[User load] User Loaded Error',
  LogoutUser = '[User Logout] Logout User',
}

export namespace UserActions{
  export const loadUser = createAction(UserActionsTypes.LoadUser, props<{userData: IUser}>());
  // export const UserLoadedSuccess = createAction(UserLoginActionsTypes.UserLoadedSuccess, props<{user: UserData}>());
  // export const UserLoadedError = createAction(UserLoginActionsTypes.UserLoadedError, props<{error: any}>());
  export const logoutUser = createAction(UserActionsTypes.LogoutUser);
}
