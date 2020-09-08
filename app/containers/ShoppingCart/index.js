/**
 *
 * ShoppingCart
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
import {
  selectProductList,
  selectShippingMethod,
  selectShippingMethodOptions,
  selectProductListTotal,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Panel from '../../components/Panel';
import ProductItem, { ProductPropType } from './components/ProductItem';
import { PricePropType, Currency } from '../../utils/currency';

export function ShoppingCart({
  productList,
  productListTotal,
  shippingMethodOptions,
  shippingMethod,
}) {
  useInjectReducer({ key: 'shoppingCart', reducer });
  useInjectSaga({ key: 'shoppingCart', saga });

  const intl = useIntl();

  const onChangeShippingMethod = () => {};

  return (
    <div>
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
              <ProductItem key={product.id} product={product} />
            ))}
        </Panel>
        <Panel
          className="report"
          title={intl.formatMessage(messages.reportTitle)}
        >
          <div onChange={onChangeShippingMethod}>
            <ul className="shipping-method-list">
              <div className="title">
                {intl.formatMessage(messages.shippingMethodTitle)}
              </div>
              {shippingMethodOptions.map(option => (
                <li key={option.id}>
                  <input
                    id={option.id}
                    type="radio"
                    name="shipping-method"
                    value={option.id}
                    checked={shippingMethod && option.id === shippingMethod.id}
                  />
                  <div className="label-container">
                    <label htmlFor={option.id}>{option.title}</label>
                    <div>{option.description}</div>
                  </div>
                  <div>{`${new Currency(option.price)}`}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>{intl.formatMessage(messages.subTotalTitle)}</div>
            <div>{`${new Currency(productListTotal)}`}</div>
          </div>
        </Panel>
      </div>
    </div>
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
};

const mapStateToProps = createStructuredSelector({
  productList: selectProductList,
  productListTotal: selectProductListTotal,
  shippingMethod: selectShippingMethod,
  shippingMethodOptions: selectShippingMethodOptions,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ShoppingCart);
