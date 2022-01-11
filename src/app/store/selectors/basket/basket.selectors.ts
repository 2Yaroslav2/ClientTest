import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BASKET_KEY} from "../../../shared/key/any.key";

import * as fromBasketGoods from '../../reducers/basket/basket.reducer';

export namespace BasketSelectors{
  export const featureSelector = createFeatureSelector<fromBasketGoods.BasketState>(BASKET_KEY);

  export const selectBasketGoodsIds = createSelector(
    featureSelector, fromBasketGoods.selectBasketGoodsIds
  );

  export const selectBasketGoodsEntities = createSelector(
    featureSelector, fromBasketGoods.selectBasketGoodsEntities
  );

  export const selectAllBasketGoods = createSelector(
    featureSelector, fromBasketGoods.selectAllBasketGoods
  );

  export const selectBasketGoodsTotal = createSelector(
    featureSelector, fromBasketGoods.selectBasketGoodsTotal
  );

  export const selectCurrentBasketGoodsId = createSelector(
    featureSelector,fromBasketGoods.getSelectedGoodsId
  );

  export const selectCurrentBasketGoods = createSelector(
    selectBasketGoodsEntities,
    selectCurrentBasketGoodsId,
    (basketGoodsEntities, basketGoodsId) => basketGoodsId && basketGoodsEntities[basketGoodsId]
  );

}
