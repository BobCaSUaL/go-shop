/*
 *
 * ShoppingCart actions
 *
 */

import { SET_PRODUCT_QUANTITY } from './constants';

/**
 * Set the quantity by product id.
 * @param {Object} meta
 * @param {string} meta.id the product id
 * @param {number} payload the quantity to be set
 */
export function setProductQuantity(meta, payload) {
  return {
    type: SET_PRODUCT_QUANTITY,
    meta,
    payload,
  };
}
