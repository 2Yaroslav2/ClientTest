import {createAction, props} from "@ngrx/store";
import {Update} from "@ngrx/entity";
import {IGoodsDescription} from "../../../models/interfaces/goods-description/goods-description.model";

export enum GoodsDescriptionActionsType {
  AddGoodsDescription = '[Add Goods Description] Add goods description',
  AddListGoodsDescription = '[Add List Goods Description] Add list goods description',
  RemoveGoodsDescription = '[Remove Goods Description] Remove goods description',
  UpdateGoodsDescription = '[Update Goods Description] Update goods description',
  SelectGoodsDescription = '[Select Goods Description] Select goods description',
}

export namespace GoodsDescriptionActions {
  export const addGoodsDescription
    = createAction(GoodsDescriptionActionsType.AddGoodsDescription, props<{goodsDescription: IGoodsDescription}>());
  export const removeGoodsDescription
    = createAction(GoodsDescriptionActionsType.RemoveGoodsDescription, props<{id: number}>());
  export const updateGoodsDescription
    = createAction(GoodsDescriptionActionsType.UpdateGoodsDescription, props<{update: Update<IGoodsDescription>}>());
  export const selectGoodsDescription
    = createAction(GoodsDescriptionActionsType.SelectGoodsDescription, props<{id: number}>());
  export const addListGoodsDescription
    = createAction(GoodsDescriptionActionsType.AddListGoodsDescription,props<{listGoodsDescription: IGoodsDescription[]}>());
}
