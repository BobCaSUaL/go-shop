/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';

function Image(props) {
  return <img className={props.className} src={props.source} alt={props.alt} />;
}

// We require the use of src and alt, only enforced by react in dev mode
Image.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default Image;
