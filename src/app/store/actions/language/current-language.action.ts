import {createAction, props} from "@ngrx/store";
import {Update} from "@ngrx/entity";
import {ILanguage} from "../../../models/interfaces/language/language.model";

export enum CurrentLanguageActionsType {
  AddCurrentLanguage = '[Add Current Language] Add current language',
  RemoveCurrentLanguage = '[Remove Current Language] Remove current language',
  UpdateCurrentLanguage = '[Update Current Language] Update current language',
  SelectCurrentLanguage = '[Select Current Language] Select current language',
}

export namespace CurrentLanguageActions {
  export const addCurrentLanguage
    = createAction(CurrentLanguageActionsType.AddCurrentLanguage, props<{language: string}>());
}
