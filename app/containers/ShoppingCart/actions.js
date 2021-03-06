/*
 *
 * ShoppingCart actions
 *
 */

import {
  PUSH_PRODUCT,
  SET_PRODUCT_QUANTITY,
  SET_SHIPPING_METHOD,
} from './constants';

/**
 * Add a new product to the basket.
 * @param {null} meta
 * @param {import('./selectors').ShoppingCartProduct} payload the quantity to be set
 */
export function pushProduct(meta, payload) {
  return {
    type: PUSH_PRODUCT,
    meta,
    payload,
  };
}

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

/**
 * Set the shipping method
 * @param {null} meta
 * @param {import('./selectors').ShippingMethod} payload the quantity to be set
 */
export function setShippingMethod(meta, payload) {
  return {
    type: SET_SHIPPING_METHOD,
    meta,
    payload,
  };
}
