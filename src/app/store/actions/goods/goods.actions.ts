import {createAction, props} from "@ngrx/store";
import {Update} from "@ngrx/entity";
import {IGoods} from "../../../models/interfaces/goods/goods.model";

export enum GoodsActionsType {
  AddGoods = '[Add Goods] Add goods',
  AddListGoods = '[Add List Goods] Add list goods',
  RemoveGoods = '[Remove Goods] Remove goods',
  UpdateGoods = '[Update Goods] Update Goods',
  SelectGoods = '[Select Goods] Select Goods',
}

export namespace GoodsActions {
  export const addGoods
    = createAction(GoodsActionsType.AddGoods, props<{goods: IGoods}>());
  export const removeGoods
    = createAction(GoodsActionsType.RemoveGoods, props<{id: number}>());
  export const updateGoods
    = createAction(GoodsActionsType.UpdateGoods, props<{update: Update<IGoods>}>());
  export const selectGoods
    = createAction(GoodsActionsType.SelectGoods, props<{id: number}>());
  export const addListGoods
    = createAction(GoodsActionsType.AddListGoods,props<{listGoods: IGoods[]}>());
}
