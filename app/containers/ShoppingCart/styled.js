/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const StyledShoppingCart = styled.div`
  & > .content-container {
    display: flex;
    padding-top: 24px;

    & > .panel {
      &:not(:last-child) {
        margin-right: 32px;
      }

      &.product-list {
        flex: 5;
      }
      &.report {
        flex: 3;
      }
    }

    .shipping-method-list {
      list-style-type: none;
      .shipping-method-list-item {
        display: flex;
        justify-content: space-between;
        &:not(:last-child) {
          margin-bottom: 12px;
        }

        input[type=radio] {
          border: 0px;
          width: 100%;
          max-width: 1.5rem; // width/max-width needed for a chrome issue
          height: 1.5em;
          margin: 12px;
        }

        .label-container {
          flex-grow: 1;
        }

        .price {
          min-width: 5rem;
          text-align: right;
        }
      }
    }

    .price-container {
      display: flex;
      justify-content: space-between;
      margin: 20px 0 20px 20px;
      .price-label {
        font-size: normal;
        font-weight: bold;
      }
      .price-value {
        font-size: large;
        font-weight: bold;
      }
    }

    .price-container.grandtotal {
      .price-label {
        font-size: large;
      }
      .price-value {
        font-size: x-large;
      }
    }
  }
`;
