import {createAction, props} from "@ngrx/store";
import {Update} from "@ngrx/entity";
import {ICategory} from "../../../models/interfaces/category/category.model";

export enum CategoryActionsType {
  AddCategory = '[Add Category] Add category',
  AddListCategory = '[Add List Category] Add list category',
  RemoveCategory = '[Remove Category] Remove category',
  RemoveAllCategory = '[Remove All Category] Remove all category',
  UpdateCategory = '[Update Category] Update category',
  SelectCategory = '[Select Category] Select category',
}

export namespace CategoryAction {
  export const addCategory
    = createAction(CategoryActionsType.AddCategory, props<{category: ICategory}>());
  export const removeCategory
    = createAction(CategoryActionsType.RemoveCategory, props<{id: number}>());
  export const updateCategory
    = createAction(CategoryActionsType.UpdateCategory, props<{update: Update<ICategory>}>());
  export const selectCategory
    = createAction(CategoryActionsType.SelectCategory, props<{id: number}>());
  export const addListCategory
    = createAction(CategoryActionsType.AddListCategory,props<{categories: ICategory[]}>());
  export const removeAllCategory
    = createAction(CategoryActionsType.RemoveAllCategory);
}
