import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { Color } from '../styles/GlobalStyles';

const Icon = ({ source, color, size, style }) => {
  // Map size values to corresponding pixel values
  const sizeMapping = {
    small: 16,
    big: 24,
    superBig: 30,
  };

  // Determine the size or default to "big" if the provided size is not valid
  const iconSize = sizeMapping[size] || sizeMapping.big;

  return (
    <Image
      style={{
        tintColor: color || Color.primary, // Use Color.primary if color is not provided
        width: iconSize,
        height: iconSize,
        ...style, // Apply additional styles
      }}
      source={source}
    />
  );
};

Icon.propTypes = {
  source: PropTypes.number.isRequired, // Image source
  color: PropTypes.string, // Icon color (optional)
  size: PropTypes.oneOf(['small', 'big', 'superBig']),
  style: PropTypes.object, // Additional style prop
};

Icon.defaultProps = {
  size: 'big',
};

export default Icon;
