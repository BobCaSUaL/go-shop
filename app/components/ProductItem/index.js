/**
 *
 * ProductItem
 *
 */

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Image from '../Image';
import { Currency, PricePropType } from '../../utils/currency';
import { StyledProductItem } from './styled';

function ProductItem({ id, className, product, onQuantityChange }) {
  const price = new Currency(product.price);
  const total = price.multiply(product.quantity);

  const handleQuantityChange = useCallback(
    event => {
      onQuantityChange(Math.max(Number(event.taget.value) || 0, 0));
    },
    [onQuantityChange],
  );

  const quantityDecrease = () => {
    onQuantityChange(Math.max(product.quantity - 1, 0));
  };

  const quantityIncrease = () => {
    onQuantityChange(product.quantity + 1);
  };

  return (
    <StyledProductItem id={id} className={className}>
      <div className="image-container">
        <Image source={product.thumbnail} />
      </div>
      <div className="detail-container">
        <div className="title-container">{product.title}</div>
        <div>{`${price}`}</div>
      </div>
      <div className="quantity-container">
        <button type="button" className="decrease" onClick={quantityDecrease}>
          -
        </button>
        <input
          id={`input-quantity-${product.id}`}
          type="number"
          value={product.quantity}
          onChange={handleQuantityChange}
        />
        <button type="button" className="increase" onClick={quantityIncrease}>
          {' '}
          +{' '}
        </button>
      </div>
      <div className="total-container">{`${total}`}</div>
    </StyledProductItem>
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
  onQuantityChange: PropTypes.func.isRequired,
};

export { ProductPropType };
export default memo(ProductItem);
