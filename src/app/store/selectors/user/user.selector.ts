import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../../reducers/user/user.reducer";
import {USER_KEY} from "../../../shared/key/any.key";


export namespace UserSelectors{
  export const featureSelector = createFeatureSelector<UserState>(USER_KEY);
  export const getUserSelector = createSelector(featureSelector, (state) => state.userData);
}


