/**
 *
 * ShoppingList
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
import makeSelectShoppingList from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function ShoppingList() {
  useInjectReducer({ key: 'shoppingList', reducer });
  useInjectSaga({ key: 'shoppingList', saga });

  return (
    <div>
      <Helmet>
        <title>ShoppingList</title>
        <meta name="description" content="Description of ShoppingList" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ShoppingList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  shoppingList: makeSelectShoppingList(),
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
)(ShoppingList);
