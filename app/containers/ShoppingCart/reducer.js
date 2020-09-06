/*
 *
 * ShoppingCart reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  productList: {
    'p-6005': {
      id: 'p-6005',
      thumbnail: null,
      title: 'Sculpture of whatever it is',
      price: '99.99€',
      quantity: 2,
      maxQuantity: 4,
    },
    'p-6057': {
      id: 'p-6057',
      thumbnail: null,
      title: 'Statue of the three graces',
      price: '156.06€',
      quantity: 1,
      maxQuantity: 3,
    },
    /* Ordered associative list */
  },
  promoCode: null,
  VAT: null,
  shippingMethod: null,
  paymentMethod: null,
};

/* eslint-disable default-case, no-param-reassign */
const shoppingCartReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default shoppingCartReducer;
