/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const StyledProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
  & > .quantity-container {
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
`;
