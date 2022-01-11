import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import {IOrder} from "../../../models/interfaces/order/order.model";
import {OrderActions} from "../../actions/order/order.actions";

export interface OrderState extends EntityState<IOrder>{
  currentOrderId: number | null
}

export const adapter: EntityAdapter<IOrder> = createEntityAdapter<IOrder>();

export const initialState: OrderState = adapter.getInitialState({
  currentOrderId: null
});

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.addOrder, (state, {order}) =>{
    return adapter.addOne(order, state)
  }),
  on(OrderActions.addListOrder, (state, {listOrder}) =>{
    return adapter.addMany(listOrder, state)
  }),
  on(OrderActions.removeOrder, (state, {id}) =>{
    return adapter.removeOne(id, state)
  }),
  on(OrderActions.updateOrder, (state, {update}) =>{
    return adapter.updateOne(update, state)
  }),
  on(OrderActions.selectOrder, (state, {id}) => ({
    ...state,
    currentGoodsId: id
  }))
);


export const getSelectedOrderId = (state: OrderState) => state.currentOrderId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectOrderIds = selectIds;
export const selectOrderEntities = selectEntities;
export const selectAllOrder = selectAll;
export const selectOrderTotal = selectTotal;
