import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LANGUAGE_KEY} from "../../../shared/key/any.key";

import * as fromLanguage from '../../reducers/language/language.reducer';

export namespace LanguageSelectors{
  export const featureSelector = createFeatureSelector<fromLanguage.LanguageState>(LANGUAGE_KEY);

  export const selectLanguageIds = createSelector(
    featureSelector, fromLanguage.selectLanguageIds
  );

  export const selectLanguageEntities = createSelector(
    featureSelector, fromLanguage.selectLanguageEntities
  );

  export const selectAllLanguage = createSelector(
    featureSelector, fromLanguage.selectAllLanguage
  );

  export const selectLanguageTotal = createSelector(
    featureSelector, fromLanguage.selectLanguageTotal
  );
  export const selectCurrentLanguageId = createSelector(
    featureSelector,fromLanguage.getSelectedLanguageId
  );

  export const selectCurrentLanguage = createSelector(
    selectLanguageEntities,
    selectCurrentLanguageId,
    (languageEntities, languageId) =>
      languageId && languageEntities[languageId]
  );

}
