import {createFeatureSelector, createSelector} from "@ngrx/store";
import {GOODS_DESCRIPTION_KEY} from "../../../shared/key/any.key";

import * as fromGoodsDescription from '../../reducers/goods-description/goods-description.reducer';

export namespace GoodsDescriptionSelectors{
  export const featureSelector = createFeatureSelector<fromGoodsDescription.GoodsDescriptionState>(GOODS_DESCRIPTION_KEY);

  export const selectGoodsDescriptionIds = createSelector(
    featureSelector, fromGoodsDescription.selectGoodsDescriptionIds
  );

  export const selectGoodsDescriptionEntities = createSelector(
    featureSelector, fromGoodsDescription.selectGoodsDescriptionEntities
  );

  export const selectAllGoodsDescription = createSelector(
    featureSelector, fromGoodsDescription.selectAllGoodsDescription
  );

  export const selectGoodsDescriptionTotal = createSelector(
    featureSelector, fromGoodsDescription.selectGoodsDescriptionTotal
  );

  export const selectCurrentGoodsDescriptionId = createSelector(
    featureSelector,fromGoodsDescription.getSelectedGoodsDescriptionId
  );

  export const selectCurrentGoodsDescription = createSelector(
    selectGoodsDescriptionEntities,
    selectCurrentGoodsDescriptionId,
    (goodsEntities, goodsId) =>
      goodsId && goodsEntities[goodsId]
  );

}
