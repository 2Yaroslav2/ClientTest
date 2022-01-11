import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import {ICategory} from "../../../models/interfaces/category/category.model";
import {CategoryAction} from "../../actions/category/category.action";

export interface CategoryState extends EntityState<ICategory>{
  currentCategoryId: number | null
}

export const adapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>();

export const initialState: CategoryState = adapter.getInitialState({
  currentCategoryId: null
});

export const categoryReducer = createReducer(
  initialState,
  on(CategoryAction.addCategory, (state, {category}) =>{
    return adapter.addOne(category, state);
  }),
  on(CategoryAction.addListCategory, (state, {categories}) =>{
    return adapter.addMany(categories, state);
  }),
  on(CategoryAction.removeCategory, (state, {id}) =>{
    return adapter.removeOne(id, state);
  }),
  on(CategoryAction.updateCategory, (state, {update}) =>{
    return adapter.updateOne(update, state);
  }),
  on(CategoryAction.selectCategory, (state, {id}) => ({
    ...state,
    currentCategoryId: id
  })),
  on(CategoryAction.removeAllCategory, state =>{
    return adapter.removeAll({
      ...state,
      currentCategoryId: null
    });
  })
);


export const getSelectedCategoryId = (state: CategoryState) => state.currentCategoryId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectCategoryIds = selectIds;
export const selectCategoryEntities = selectEntities;
export const selectAllCategory = selectAll;
export const selectCategoryTotal = selectTotal;
