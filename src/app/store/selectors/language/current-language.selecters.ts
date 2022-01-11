import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CurrentLanguageState} from "../../reducers/language/current-language.reducer";
import {CURRENT_LANGUAGE_KEY} from "../../../shared/key/any.key";

export namespace CurrentLanguageSelectors{
  export const featureSelector = createFeatureSelector<CurrentLanguageState>(CURRENT_LANGUAGE_KEY);
  export const getCurrentLanguageSelector = createSelector(featureSelector, (state) => state.currentLanguage);
}


