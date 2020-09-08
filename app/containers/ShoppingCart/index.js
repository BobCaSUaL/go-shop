/**
 *
 * ShoppingCart
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { selectProductList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Panel from '../../components/Panel';
import ProductItem from './components/ProductItem';

export function ShoppingCart({ productList }) {
  useInjectReducer({ key: 'shoppingCart', reducer });
  useInjectSaga({ key: 'shoppingCart', saga });

  const intl = useIntl();

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
        <Panel className="product-list">
          {!productList ||
            productList.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
        </Panel>
        <Panel className="report" />
      </div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ShoppingCart.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = createStructuredSelector({
  productList: selectProductList,
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
