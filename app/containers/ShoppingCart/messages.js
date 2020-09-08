/*
 * ShoppingCart Messages
 *
 * This contains all the text for the ShoppingCart container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ShoppingCart';

export default defineMessages({
  headerTitle: {
    id: `${scope}.headerTitle`,
    defaultMessage: 'ShoppingCart',
  },
  headerDescription: {
    id: `${scope}.headerDescription`,
    defaultMessage: 'Shopping Cart',
  },
  productListTitle: {
    id: `${scope}.productListTitle`,
    defaultMessage: 'Shopping Cart',
  },
  reportTitle: {
    id: `${scope}.reportTitle`,
    defaultMessage: 'Order report',
  },
});
