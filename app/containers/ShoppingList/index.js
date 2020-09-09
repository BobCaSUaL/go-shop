/**
 *
 * ShoppingList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Panel from '../../components/Panel';
import ProductItem, { ProductPropType } from '../../components/ProductItem';
import * as shoppingCartActions from '../ShoppingCart/actions';
import { selectProductList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const ConnectedProductItem = connect(
  null,
  (dispatch, ownProps) => ({
    onQuantityChange: quantity => {
      const { product } = ownProps;
      if (!product) {
        console.warn(
          'product is not defined within ConnectedProductItem props',
        );
        return;
      }
      if (product.quantity <= 0) {
        dispatch(
          shoppingCartActions.pushProduct(null, { ...product, quantity }),
        );
      } else {
        const { id } = product;
        dispatch(shoppingCartActions.setProductQuantity({ id }, quantity));
      }
    },
  }),
)(ProductItem);

export function ShoppingList({ productList }) {
  useInjectReducer({ key: 'shoppingList', reducer });
  useInjectSaga({ key: 'shoppingList', saga });

  const intl = useIntl();

  return (
    <div>
      <Helmet>
        <title>ShoppingList</title>
        <meta name="description" content="Description of ShoppingList" />
      </Helmet>
      <Panel title={intl.formatMessage(messages.listTitle)}>
        {!productList ||
          productList.map(product => (
            <ConnectedProductItem key={product.id} product={product} />
          ))}
      </Panel>
    </div>
  );
}

ShoppingList.propTypes = {
  productList: PropTypes.arrayOf(ProductPropType).isRequired,
};

const mapStateToProps = createStructuredSelector({
  productList: selectProductList,
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ShoppingList);
