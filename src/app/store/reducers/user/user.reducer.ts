import {IUser} from "../../../models/interfaces/user/user.model";
import {createReducer, on} from "@ngrx/store";
import {UserActions} from "../../actions/user/user.action";


export interface UserState {
  userData: IUser
}

export const initialState: UserState = {
  userData: {
    id: 'Test Id',
    userName: 'Test Name',
    email: 'testEmail@gmail.com',
    role: 'Test role'
  }
}

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state, {userData}) =>({
    ...state,
    userData: userData
  })),
  on(UserActions.logoutUser, (state) => ({
    ...state,
    userData: {id: '', userName: '', email: '', role: ''}
  }))
)
