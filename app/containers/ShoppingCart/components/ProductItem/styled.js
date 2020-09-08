import styled from 'styled-components';

export const StyledProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
