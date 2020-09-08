/**
 *
 * ProductItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Image from '../../../../components/Image';
import { Currency, PricePropType } from '../../../../utils/currency';

function ProductItem({ id, className, product }) {
  const price = new Currency(product.price);
  const total = price.multiply(product.quantity);

  return (
    <div id={id} className={className}>
      <div className="image-container">
        <Image source={product.thumbnail} />
      </div>
      <div className="detail-container">
        <div className="title-container">{product.title}</div>
        <div>{price.toString()}</div>
      </div>
      <div className="quantity-container">{product.quantity}</div>
      <div className="total-container">{total.toString()}</div>
    </div>
  );
}

const ProductPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  price: PricePropType,
  quantity: PropTypes.number.isRequired,
  maxQuantity: PropTypes.number,
});

ProductItem.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  product: ProductPropType.isRequired,
};

export { ProductPropType };
export default memo(ProductItem);
