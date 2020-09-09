import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { selectShoppingCartDomain } from '../ShoppingCart/selectors';

/**
 * Direct selector to the shoppingList state domain
 */

const selectShoppingListDomain = state => state.shoppingList || initialState;

/**
 * Other specific selectors
 */

/**
 * Selector for the current productList.
 * @param {State} state the global state
 * @return {Array.<import('../ShoppingCart/selectors').ShoppingCartProduct>}.
 */
export const selectProductList = createSelector(
  selectShoppingListDomain,
  selectShoppingCartDomain,
  (substate, shoppingCartState) =>
    substate.productList.map(({ id, ...product }) => ({
      ...product,
      id,
      quantity: (shoppingCartState.productList[id] || {}).quantity || 0,
    })),
);

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
