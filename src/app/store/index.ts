import {ActionReducerMap} from '@ngrx/store';
import {userReducer, UserState} from "./reducers/user/user.reducer";
import {
  BASKET_KEY, CATEGORY_KEY, CURRENT_LANGUAGE_KEY,
  GOODS_DESCRIPTION_KEY,
  GOODS_KEY,
  LANGUAGE_KEY,
  ORDER_KEY,
  USER_KEY
} from "../shared/key/any.key";

import * as fromBasketGoods from '../store/reducers/basket/basket.reducer';
import * as fromGoods from './reducers/goods/goods.reducer';
import * as fromOrder from './reducers/order/order.reducer';
import * as fromGoodsDescription from './reducers/goods-description/goods-description.reducer';
import * as fromLanguage from './reducers/language/language.reducer';
import * as fromCategory from './reducers/category/category.reducer';
import * as fromCurrentLanguage from  './reducers/language/current-language.reducer';

export interface State {
  [USER_KEY]: UserState,
  [BASKET_KEY]: fromBasketGoods.BasketState,
  [GOODS_KEY]: fromGoods.GoodsState,
  [ORDER_KEY]: fromOrder.OrderState,
  [GOODS_DESCRIPTION_KEY]: fromGoodsDescription.GoodsDescriptionState,
  [LANGUAGE_KEY]: fromLanguage.LanguageState,
  [CATEGORY_KEY]: fromCategory.CategoryState,
  [CURRENT_LANGUAGE_KEY]: fromCurrentLanguage.CurrentLanguageState,
}

export const reducers: ActionReducerMap<State> = {
  [USER_KEY]: userReducer,
  [BASKET_KEY]: fromBasketGoods.basketReducer,
  [GOODS_KEY]: fromGoods.goodsReducer,
  [ORDER_KEY]: fromOrder.orderReducer,
  [GOODS_DESCRIPTION_KEY]: fromGoodsDescription.goodsDescriptionReducer,
  [LANGUAGE_KEY]: fromLanguage.languageReducer,
  [CATEGORY_KEY]: fromCategory.categoryReducer,
  [CURRENT_LANGUAGE_KEY]: fromCurrentLanguage.currentLanguageReducer,
};



