import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {IGoods} from "../../../models/interfaces/goods/goods.model";
import {createReducer, on} from "@ngrx/store";
import {GoodsActions} from "../../actions/goods/goods.actions";

export interface GoodsState extends EntityState<IGoods>{
  currentGoodsId: number | null
}

export const adapter: EntityAdapter<IGoods> = createEntityAdapter<IGoods>();

export const initialState: GoodsState = adapter.getInitialState({
  currentGoodsId: null
});

export const goodsReducer = createReducer(
  initialState,
  on(GoodsActions.addGoods, (state, {goods}) =>{
    return adapter.addOne(goods, state)
  }),
  on(GoodsActions.addListGoods, (state, {listGoods}) =>{
    return adapter.addMany(listGoods, state)
  }),
  on(GoodsActions.removeGoods, (state, {id}) =>{
    return adapter.removeOne(id, state)
  }),
  on(GoodsActions.updateGoods, (state, {update}) =>{
    return adapter.updateOne(update, state)
  }),
  on(GoodsActions.selectGoods, (state, {id}) => ({
    ...state,
    currentGoodsId: id
  }))
);

export const getSelectedGoodsId = (state: GoodsState) => state.currentGoodsId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectGoodsIds = selectIds;
export const selectGoodsEntities = selectEntities;
export const selectAllGoods = selectAll;
export const selectGoodsTotal = selectTotal;
