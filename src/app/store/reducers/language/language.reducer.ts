import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import {ILanguage} from "../../../models/interfaces/language/language.model";
import {LanguageActions} from "../../actions/language/language.action";

export interface LanguageState extends EntityState<ILanguage>{
  currentLanguageId: number | null
}

export const adapter: EntityAdapter<ILanguage> = createEntityAdapter<ILanguage>();

export const initialState: LanguageState = adapter.getInitialState({
  currentLanguageId: null
});

export const languageReducer = createReducer(
  initialState,
  on(LanguageActions.addLanguage, (state, {language}) =>{
    return adapter.addOne(language, state)
  }),
  on(LanguageActions.addListLanguage, (state, {listLanguage}) =>{
    return adapter.addMany(listLanguage, state)
  }),
  on(LanguageActions.removeLanguage, (state, {id}) =>{
    return adapter.removeOne(id, state)
  }),
  on(LanguageActions.updateLanguage, (state, {update}) =>{
    return adapter.updateOne(update, state)
  }),
  on(LanguageActions.selectLanguage, (state, {id}) => ({
    ...state,
    currentLanguageId: id
  }))
);


export const getSelectedLanguageId = (state: LanguageState) => state.currentLanguageId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectLanguageIds = selectIds;
export const selectLanguageEntities = selectEntities;
export const selectAllLanguage = selectAll;
export const selectLanguageTotal = selectTotal;
