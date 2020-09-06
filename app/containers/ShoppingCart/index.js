/**
 *
 * ShoppingCart
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectShoppingCart from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ShoppingCart() {
  useInjectReducer({ key: 'shoppingCart', reducer });
  useInjectSaga({ key: 'shoppingCart', saga });

  return (
    <div>
      <Helmet>
        <title>ShoppingCart</title>
        <meta name="description" content="Description of ShoppingCart" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ShoppingCart.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  shoppingCart: makeSelectShoppingCart(),
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
