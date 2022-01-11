import {createFeatureSelector, createSelector} from "@ngrx/store";
import {GOODS_KEY} from "../../../shared/key/any.key";

import * as fromGoods from '../../reducers/goods/goods.reducer';

export namespace GoodsSelectors{
  export const featureSelector = createFeatureSelector<fromGoods.GoodsState>(GOODS_KEY);

  export const selectGoodsIds = createSelector(
    featureSelector, fromGoods.selectGoodsIds
  );

  export const selectGoodsEntities = createSelector(
    featureSelector, fromGoods.selectGoodsEntities
  );

  export const selectAllGoods = createSelector(
    featureSelector, fromGoods.selectAllGoods
  );

  export const selectGoodsTotal = createSelector(
    featureSelector, fromGoods.selectGoodsTotal
  );

  export const selectCurrentGoodsId = createSelector(
    featureSelector,fromGoods.getSelectedGoodsId
  );

  export const selectCurrentGoods = createSelector(
    selectGoodsEntities,
    selectCurrentGoodsId,
    (goodsEntities, goodsId) =>
      goodsId && goodsEntities[goodsId]
  );

}
