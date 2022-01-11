import {createAction, props} from "@ngrx/store";
import {Update} from "@ngrx/entity";
import {IOrder} from "../../../models/interfaces/order/order.model";

export enum OrderActionsType {
  AddOrder = '[Add Order] Add goods',
  AddListOrder = '[Add List Order] Add list order',
  RemoveOrder = '[Remove Order] Remove Order',
  UpdateOrder = '[Update Order] Update Order',
  SelectOrder = '[Select Order] Select Order',
}

export namespace OrderActions {
  export const addOrder
    = createAction(OrderActionsType.AddOrder, props<{order: IOrder}>());
  export const removeOrder
    = createAction(OrderActionsType.RemoveOrder, props<{id: number}>());
  export const updateOrder
    = createAction(OrderActionsType.UpdateOrder, props<{update: Update<IOrder>}>());
  export const selectOrder
    = createAction(OrderActionsType.SelectOrder, props<{id: number}>());
  export const addListOrder
    = createAction(OrderActionsType.AddListOrder,props<{listOrder: IOrder[]}>());
}
