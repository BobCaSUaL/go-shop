/*
 *
 * ShoppingCart reducer
 *
 */
import produce from 'immer';
import { SET_PRODUCT_QUANTITY, SET_SHIPPING_METHOD } from './constants';

export const initialState = {
  shippingMethodOptions: [
    {
      id: 's-100',
      title: 'Standar shipping',
      description: 'Shipping time around 5 days',
      price: '0€',
    },
    {
      id: 's-101',
      title: 'Fast shipping',
      description: 'Track you order in real time. 48h guaranteed shipment.',
      price: '20€',
    },
  ],
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
  produce(state, draft => {
    switch (action.type) {
      case SET_PRODUCT_QUANTITY:
        if (!action.meta || !action.meta.id) {
          console.warn(
            `"${SET_PRODUCT_QUANTITY}" action must have a meta.id property`,
          );
          break;
        }
        if (!draft.productList[action.meta.id]) {
          console.warn(
            `"${SET_PRODUCT_QUANTITY}" acts on product with id ${
              action.meta.id
            }, that is not defined`,
          );
          break;
        }
        draft.productList[action.meta.id].quantity = action.payload || 0;
        break;

      case SET_SHIPPING_METHOD:
        draft.shippingMethod = action.payload || null;
        break;
    }
  });

export default shoppingCartReducer;
