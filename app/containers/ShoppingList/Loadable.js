/**
 *
 * Asynchronously loads the component for ShoppingList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
