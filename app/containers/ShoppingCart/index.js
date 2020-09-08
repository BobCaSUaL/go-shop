/**
 *
 * ShoppingCart
 *
 */

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import * as actions from './actions';
import {
  selectProductList,
  selectShippingMethod,
  selectShippingMethodOptions,
  selectProductListTotal,
  selectGrandTotal,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Panel from '../../components/Panel';
import ProductItem, { ProductPropType } from './components/ProductItem';
import { PricePropType, Currency } from '../../utils/currency';
import { StyledShoppingCart } from './styled';

const ConnectedProductItem = connect(
  null,
  (dispatch, ownProps) => ({
    onQuantityChange: quantity => {
      if (!ownProps.product) {
        console.warn(
          'product is not defined within ConnectedProductItem props',
        );
        return;
      }
      const { id } = ownProps.product;
      dispatch(actions.setProductQuantity({ id }, quantity));
    },
  }),
)(ProductItem);

export function ShoppingCart({
  productList,
  productListTotal,
  shippingMethodOptions,
  shippingMethod,
  onShippingMethodChange,
  grandTotal,
}) {
  useInjectReducer({ key: 'shoppingCart', reducer });
  useInjectSaga({ key: 'shoppingCart', saga });

  const intl = useIntl();

  const handleChangeShippingMethodClick = useCallback(
    event => {
      onShippingMethodChange(
        shippingMethodOptions.find(({ id }) => id === event.target.value),
      );
    },
    [shippingMethodOptions],
  );

  return (
    <StyledShoppingCart>
      <Helmet>
        <title>{intl.formatMessage(messages.headerTitle)}</title>
        <meta
          name="description"
          content={intl.formatMessage(messages.headerDescription)}
        />
      </Helmet>
      <div className="content-container">
        <Panel
          className="product-list"
          title={intl.formatMessage(messages.productListTitle)}
        >
          {!productList ||
            productList.map(product => (
              <ConnectedProductItem key={product.id} product={product} />
            ))}
        </Panel>
        <Panel
          className="report"
          title={intl.formatMessage(messages.reportTitle)}
        >
          <div className="shipping-method-list">
            <div className="title">
              {intl.formatMessage(messages.shippingMethodTitle)}
            </div>
            {shippingMethodOptions.map(option => (
              <div key={option.id} className="shipping-method-list-item">
                <input
                  id={option.id}
                  type="radio"
                  name="shipping-method"
                  value={option.id}
                  checked={!!shippingMethod && option.id === shippingMethod.id}
                  onChange={handleChangeShippingMethodClick}
                />
                <div className="label-container">
                  <label htmlFor={option.id}>{option.title}</label>
                  <div>{option.description}</div>
                </div>
                <div className="price">{`${new Currency(option.price)}`}</div>
              </div>
            ))}
          </div>
          <div className="price-container subtotal">
            <div className="price-label">
              {intl.formatMessage(messages.subTotalTitle)}
            </div>
            <div className="price-value">{`${new Currency(
              productListTotal,
            )}`}</div>
          </div>
          <div className="price-container grandtotal">
            <div className="price-label">
              {intl.formatMessage(messages.grantTotlaTitle)}
            </div>
            <div className="price-value">{`${new Currency(grandTotal)}`}</div>
          </div>
        </Panel>
      </div>
    </StyledShoppingCart>
  );
}

const ShippingMethodProptype = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PricePropType,
});

ShoppingCart.propTypes = {
  productList: PropTypes.arrayOf(ProductPropType.isRequired).isRequired,
  productListTotal: PricePropType,
  shippingMethodOptions: PropTypes.arrayOf(ShippingMethodProptype).isRequired,
  shippingMethod: ShippingMethodProptype,
  onShippingMethodChange: PropTypes.func.isRequired,
  grandTotal: PricePropType,
};

const mapStateToProps = createStructuredSelector({
  productList: selectProductList,
  productListTotal: selectProductListTotal,
  shippingMethodOptions: selectShippingMethodOptions,
  shippingMethod: selectShippingMethod,
  grandTotal: selectGrandTotal,
});

const mapDispatchToProps = {
  onShippingMethodChange: shippingMethod =>
    actions.setShippingMethod(null, shippingMethod),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ShoppingCart);
