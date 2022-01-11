import {IBasket} from "../../../models/interfaces/basket/basket.model";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {BasketActions} from "../../actions/basket/basket.actions";
import {createReducer, on} from "@ngrx/store";


export interface BasketState extends EntityState<IBasket>{
  currentGoodsId: number | null,
}

export const adapter: EntityAdapter<IBasket> = createEntityAdapter<IBasket>();

export const initialState: BasketState = adapter.getInitialState({
  currentGoodsId: null
});

export const basketReducer = createReducer(
  initialState,
  on(BasketActions.addBasketGoods, (state, {basketData}) =>{
    return adapter.addOne(basketData, state)
  }),
  on(BasketActions.removeBasketGoods, (state, {id}) =>{
    return adapter.removeOne(id, state)
  }),
  on(BasketActions.updateBasketGoods, (state, {update}) =>{
    return adapter.updateOne(update, state)
  }),
  on(BasketActions.selectGoods, (state, {id}) =>({
    ...state,
    currentGoodsId: id
  })),
  on(BasketActions.addListBasketGoods, (state, {listBasketGoods}) =>{
    return adapter.addMany(listBasketGoods, state);
  }),
);


export const getSelectedGoodsId = (state: BasketState) => state.currentGoodsId;


const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectBasketGoodsIds = selectIds;
export const selectBasketGoodsEntities = selectEntities;
export const selectAllBasketGoods = selectAll;
export const selectBasketGoodsTotal = selectTotal;
