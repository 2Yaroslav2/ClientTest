import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import {IGoodsDescription} from "../../../models/interfaces/goods-description/goods-description.model";
import {GoodsDescriptionActions} from "../../actions/goods-description/goods-description.action";

export interface GoodsDescriptionState extends EntityState<IGoodsDescription>{
  currentGoodsDescriptionId: number | null
}

export const adapter: EntityAdapter<IGoodsDescription> = createEntityAdapter<IGoodsDescription>();

export const initialState: GoodsDescriptionState = adapter.getInitialState({
  currentGoodsDescriptionId: null
});

export const goodsDescriptionReducer = createReducer(
  initialState,
  on(GoodsDescriptionActions.addGoodsDescription, (state, {goodsDescription}) =>{
    return adapter.addOne(goodsDescription, state)
  }),
  on(GoodsDescriptionActions.addListGoodsDescription, (state, {listGoodsDescription}) =>{
    return adapter.addMany(listGoodsDescription, state)
  }),
  on(GoodsDescriptionActions.removeGoodsDescription, (state, {id}) =>{
    return adapter.removeOne(id, state)
  }),
  on(GoodsDescriptionActions.updateGoodsDescription, (state, {update}) =>{
    return adapter.updateOne(update, state)
  }),
  on(GoodsDescriptionActions.selectGoodsDescription, (state, {id}) => ({
    ...state,
    currentGoodsDescriptionId: id
  }))
);


export const getSelectedGoodsDescriptionId = (state: GoodsDescriptionState) => state.currentGoodsDescriptionId;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectGoodsDescriptionIds = selectIds;
export const selectGoodsDescriptionEntities = selectEntities;
export const selectAllGoodsDescription = selectAll;
export const selectGoodsDescriptionTotal = selectTotal;
