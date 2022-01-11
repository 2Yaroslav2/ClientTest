import {createAction, props} from "@ngrx/store";
import {IBasket} from "../../../models/interfaces/basket/basket.model";
import {Update} from "@ngrx/entity";

export enum BasketActionsTypes {
  AddBasketGoods = '[Add Goods] Add goods in basket',
  AddListBasketGoods = '[Add List Goods] Add list goods in basket',
  RemoveBasketGoods = '[Remove Goods] Remove goods from basket',
  UpdateBasketGoods = '[Update Goods] Update Goods for basket',
  SelectGoods = '[Select Goods] Select Goods Request',
}

export namespace BasketActions{
  export const addBasketGoods
    = createAction(BasketActionsTypes.AddBasketGoods, props<{basketData: IBasket}>());
  export const removeBasketGoods
    = createAction(BasketActionsTypes.RemoveBasketGoods, props<{id: number}>());
  export const updateBasketGoods
    = createAction(BasketActionsTypes.UpdateBasketGoods, props<{update: Update<IBasket>}>());
  export const selectGoods
    = createAction(BasketActionsTypes.SelectGoods, props<{id: number}>());
  export const addListBasketGoods
    = createAction(BasketActionsTypes.AddListBasketGoods, props<{listBasketGoods: IBasket[]}>());



}
