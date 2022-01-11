import {createAction, props} from "@ngrx/store";
import {Update} from "@ngrx/entity";
import {ILanguage} from "../../../models/interfaces/language/language.model";

export enum LanguageActionsType {
  AddLanguage = '[Add Language] Add Language',
  AddListLanguage = '[Add List Language] Add list Language',
  RemoveLanguage = '[Remove Language] Remove Language',
  UpdateLanguage = '[Update Language] Update Language',
  SelectLanguage = '[Select Language] Select Language',
}

export namespace LanguageActions {
  export const addLanguage
    = createAction(LanguageActionsType.AddLanguage, props<{language: ILanguage}>());
  export const removeLanguage
    = createAction(LanguageActionsType.RemoveLanguage, props<{id: number}>());
  export const updateLanguage
    = createAction(LanguageActionsType.UpdateLanguage, props<{update: Update<ILanguage>}>());
  export const selectLanguage
    = createAction(LanguageActionsType.SelectLanguage, props<{id: number}>());
  export const addListLanguage
    = createAction(LanguageActionsType.AddListLanguage,props<{listLanguage: ILanguage[]}>());
}
