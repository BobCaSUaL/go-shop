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
import { withRouter } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Panel from '../../components/Panel';
import ProductItem, { ProductPropType } from '../../components/ProductItem';
import * as shoppingCartActions from '../ShoppingCart/actions';
import { selectProductList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { StyledShoppingList } from './styled';

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

const ConnectedAddButton = compose(
  withRouter,
  connect(
    null,
    (dispatch, ownProps) => ({
      onClick: () => {
        const { product } = ownProps;
        if (!product) {
          console.warn(
            'product is not defined within ConnectedProductItem props',
          );
          return;
        }
        const { quantity } = product;
        if (quantity <= 0) {
          dispatch(
            shoppingCartActions.pushProduct(null, {
              ...product,
              quantity: quantity + 1,
            }),
          );
        } else {
          const { id } = product;
          dispatch(
            shoppingCartActions.setProductQuantity({ id }, quantity + 1),
          );
        }
        ownProps.history.push('/cart');
      },
    }),
  ),
)(({ product, ...props }) => <button type="button" {...props} />);

export function ShoppingList({ productList }) {
  useInjectReducer({ key: 'shoppingList', reducer });
  useInjectSaga({ key: 'shoppingList', saga });

  const intl = useIntl();

  return (
    <StyledShoppingList>
      <Helmet>
        <title>ShoppingList</title>
        <meta name="description" content="Description of ShoppingList" />
      </Helmet>
      <div className="content-container">
        <Panel title={intl.formatMessage(messages.listTitle)}>
          {!productList ||
            productList.map(product => (
              <ConnectedProductItem
                key={product.id}
                product={product}
                actions={
                  <ConnectedAddButton product={product}>
                    {intl.formatMessage(messages.addToCart)}
                  </ConnectedAddButton>
                }
              />
            ))}
        </Panel>
      </div>
    </StyledShoppingList>
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
