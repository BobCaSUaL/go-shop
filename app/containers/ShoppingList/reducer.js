/*
 *
 * ShoppingList reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  productList: [
    {
      id: 'p-6005',
      thumbnail: 'https://picsum.photos/seed/p-6005/100/120',
      title: 'Sculpture of whatever it is',
      price: '99.99€',
      maxQuantity: 4,
    },
    {
      id: 'p-6057',
      thumbnail: 'https://picsum.photos/seed/p-6057/100/120',
      title: 'Statue of the three graces',
      price: '156.06€',
      maxQuantity: 3,
    },
    {
      id: 'p-4005',
      thumbnail: 'https://picsum.photos/seed/p-4005/100/120',
      title: 'Lorem ipsum dolor sit amet',
      price: '200.00€',
      maxQuantity: 3,
    },
    {
      id: 'p-8337',
      thumbnail: 'https://picsum.photos/seed/p-8337/100/120',
      title: 'Consecuntur elispicit egit',
      price: '122.20€',
      maxQuantity: 20,
    },
  ],
};

/* eslint-disable default-case, no-param-reassign */
const shoppingListReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default shoppingListReducer;
