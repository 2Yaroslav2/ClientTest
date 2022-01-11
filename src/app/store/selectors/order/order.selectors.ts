import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ORDER_KEY} from "../../../shared/key/any.key";

import * as fromOrder from '../../reducers/order/order.reducer';

export namespace OrderSelectors{
  export const featureSelector = createFeatureSelector<fromOrder.OrderState>(ORDER_KEY);

  export const selectOrderIds = createSelector(
    featureSelector, fromOrder.selectOrderIds
  );

  export const selectOrderEntities = createSelector(
    featureSelector, fromOrder.selectOrderEntities
  );

  export const selectAllOrder = createSelector(
    featureSelector, fromOrder.selectAllOrder
  );

  export const selectOrderTotal = createSelector(
    featureSelector, fromOrder.selectOrderTotal
  );

  export const selectCurrentOrderId = createSelector(
    featureSelector,fromOrder.getSelectedOrderId
  );

  export const selectCurrentOrder = createSelector(
    selectOrderEntities,
    selectCurrentOrderId,
    (orderEntities, orderId) =>
      orderId && orderEntities[orderId]
  );

}
