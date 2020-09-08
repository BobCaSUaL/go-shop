import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * @typedef {string} URL
 */
/**
 * @typedef {string} Price value + glyph currency serialization
 */

/**
 * @typedef {Object} ShoppingCartProduct
 * @property {string} id - read only
 * @property {URL} thumbnail - read only
 * @property {string} title - read only
 * @property {string} price - read only
 * @property {number} quantity
 * @property {number} maxQuantity - read only
 */

/**
 * @typedef {Object} PromoCode
 * @property {string} code
 * @property {string} description - read only
 * @property {number} discountPercentage - read only
 * @property {Price} discountPrice - read only
 */

/**
 * @typedef {Object} ShippingMethod
 * @property {string} id - read only
 * @property {string} title - read only
 * @property {string} description - read only
 * @property {Price} price - read only
 */

/**
 * @typedef {Object} PaymentMethod
 * @property {string} id - read only
 * @property {string} title - read only
 */

export const priceRegexpDesc = '(\\d*(\\.\\d+)?)?(.+)';

/**
 * Direct selector to the shoppingCart state domain
 */

const selectShoppingCartDomain = state => state.shoppingCart || initialState;

/**
 * Other specific selectors
 */

/**
 * Selector for the current productList.
 * @param {State} state the global state
 * @return {Array.<ShoppingCartProduct>}.
 */
export const selectProductList = createSelector(
  selectShoppingCartDomain,
  substate => Object.values(substate.productList),
);

/**
 * @param {State} state the global state
 * @return {Array.<Price>} glyph-grouped price list
 */
export const selectProductListTotal = createSelector(
  selectProductList,
  productList => {
    /** @type {Object} glyph-grouped products subtotal */
    const glyphGrouped = productList.reduce((acc, product) => {
      const vector = `${product.price}`.match(new RegExp(priceRegexpDesc, 'i'));
      const [, amount, , glyph] = vector;
      const sanitizedGliph = glyph.toUpperCase();
      return {
        ...acc,
        [sanitizedGliph]: (acc[sanitizedGliph] || 0) + Number(amount),
      };
    }, {});
    return Object.keys(glyphGrouped).map(
      glyph => `${glyphGrouped[glyph]}${glyph}`,
    );
  },
);

/**
 * Selector for the current promoCode.
 * @param {State} state the global state
 * @return {PromoCode}
 */
export const selectPromoCode = createSelector(
  selectShoppingCartDomain,
  substate => substate.promoCode,
);

/**
 * Selector for the current VAT
 * @param {State} state the global state
 * @returns {number} VAT percentage
 */
export const selectVAT = createSelector(
  selectShoppingCartDomain,
  substate => substate.VAT,
);

/**
 * Selector for the current Shipping Method
 * @param {State} state the global state
 * @returns {ShippingMethod} the shippingMethod
 */
export const selectShippingMethod = createSelector(
  selectShoppingCartDomain,
  substate => substate.shippingMethod,
);

/**
 * Selector for the current Shipping Method
 * @param {State} state the global state
 * @returns {Array.<ShippingMethod>} the shippingMethod
 */
export const selectShippingMethodOptions = createSelector(
  selectShoppingCartDomain,
  substate => substate.shippingMethodOptions,
);

/**
 * Selector for the current Payment Method
 * @param {State} state the global state
 * @returns {PaymentMethod} the paymentMethod
 */
export const selectPaymentMethod = createSelector(
  selectShoppingCartDomain,
  substate => substate.paymentMethod,
);

export const selectGrandTotal = createSelector(
  // eslint-disable-next-line prettier/prettier
  [selectProductListTotal, selectPromoCode, selectVAT, selectShippingMethod],
  (productListTotal, promoCode, VAT, shippingMethod) => {
    /** @type {Object} the glyphGroupedTotal from the product list */
    const glyphGroupedTotal = productListTotal.reduce((acc, value) => {
      const [, amount, , glyph] = `${value}`.match(
        new RegExp(priceRegexpDesc, 'i'),
      );
      const sanitizedGliph = glyph.toUpperCase();
      acc[sanitizedGliph] = (acc[sanitizedGliph] || 0) + Number(amount);
      return acc;
    }, {});
    /** @type {Array.<string>} the list of the value glyph within the glyphGroupedTotal */
    const glyphList = Object.keys(glyphGroupedTotal);

    /** @type {Object} the discount total gouped by glyph */
    let discountTotal = {};
    if (promoCode) {
      if (promoCode.discountPercentage) {
        glyphList.forEach(glyph => {
          discountTotal[glyph] = glyphGroupedTotal[glyph];
        });
      } else {
        const [, amount, , glyph] = `${promoCode.discountPrice}`.match(
          new RegExp(priceRegexpDesc, 'i'),
        );
        const sanitizedGliph = glyph.toUpperCase();
        if (glyphList.includes(sanitizedGliph)) {
          // the max discount price should always be the subtotal for the specific value glyph
          discountTotal = {
            [sanitizedGliph]:
              glyphGroupedTotal[sanitizedGliph] < amount
                ? amount
                : glyphGroupedTotal[sanitizedGliph],
          };
        }
      }
    }

    /** @type {Object} the shippingMethodTotal total gouped by glyph */
    const [, shippingAmount, , shippingGlyph] = `${shippingMethod.price}`.match(
      new RegExp(priceRegexpDesc, 'i'),
    );
    const shippingMethodTotal = {
      [shippingGlyph.toUpperCase()]: shippingAmount,
    };

    return glyphList.map(glyph => {
      const total =
        glyphGroupedTotal[glyph] + (shippingMethodTotal[glyph] || 0);
      const amount = total + total * VAT - (discountTotal[glyph] || 0);
      return `${amount}${glyph}`;
    });
  },
);

/**
 * Default selector used by ShoppingCart
 */

const makeSelectShoppingCart = () =>
  createSelector(
    selectShoppingCartDomain,
    substate => substate,
  );

export default makeSelectShoppingCart;
export { selectShoppingCartDomain };
