import {ILanguage} from "../../../models/interfaces/language/language.model";
import {createReducer, on} from "@ngrx/store";
import {CurrentLanguageActions} from "../../actions/language/current-language.action";


export interface CurrentLanguageState {
  currentLanguage: string | null,
}

export const initialState: CurrentLanguageState = {
  currentLanguage: null,
}

export const currentLanguageReducer = createReducer(
  initialState,
  on(CurrentLanguageActions.addCurrentLanguage, (state, {language}) => ({
    ...state,
    currentLanguage: language
  }))
);


