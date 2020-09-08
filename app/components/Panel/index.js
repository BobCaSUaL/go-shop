/**
 *
 * Panel
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import H3 from '../H3';
import { StyledPanel } from './styled';

function Panel({ id, className, title, children }) {
  return (
    <StyledPanel id={id} className={className}>
      <H3 className="title">{title}</H3>
      <div className="content-container">{children}</div>
    </StyledPanel>
  );
}

Panel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default memo(Panel);
