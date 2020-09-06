import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the shoppingList state domain
 */

const selectShoppingListDomain = state => state.shoppingList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ShoppingList
 */

const makeSelectShoppingList = () =>
  createSelector(
    selectShoppingListDomain,
    substate => substate,
  );

export default makeSelectShoppingList;
export { selectShoppingListDomain };
