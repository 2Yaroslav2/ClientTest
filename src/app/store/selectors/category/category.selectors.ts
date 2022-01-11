import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CATEGORY_KEY} from "../../../shared/key/any.key";
import * as fromCategory from '../../reducers/category/category.reducer';

export namespace CategorySelectors{
  export const featureSelector = createFeatureSelector<fromCategory.CategoryState>(CATEGORY_KEY);

  export const selectCategoryIds = createSelector(
    featureSelector, fromCategory.selectCategoryIds
  );

  export const selectCategoryEntities = createSelector(
    featureSelector, fromCategory.selectCategoryEntities
  );

  export const selectAllCategory = createSelector(
    featureSelector, fromCategory.selectAllCategory
  );

  export const selectCategoryTotal = createSelector(
    featureSelector, fromCategory.selectCategoryTotal
  );
  export const selectCurrentCategoryId = createSelector(
    featureSelector,fromCategory.getSelectedCategoryId
  );

  export const selectCurrentCategory = createSelector(
    selectCategoryEntities,
    selectCurrentCategoryId,
    (categoryEntities, categoryId) =>
      categoryId && categoryEntities[categoryId]
  );

}
