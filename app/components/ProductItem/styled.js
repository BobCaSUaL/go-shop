/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const StyledProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  & > .detail-container {
    flex: 5;
    margin: 0 16px;
  }
  & > .quantity-container {
    flex: 1;
    min-width: 8rem;
    text-align: center;
    & > input {
      width: 3rem;
      text-align: center;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type=number] {
        -moz-appearance: textfield;
      }
    }
  }

  & > .actions-container {
    margin: 0 16px;
  }

  & > .total-container {
    min-width: 4rem;
    text-align: end;
  }
`;
