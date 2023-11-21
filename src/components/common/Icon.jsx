import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

const Icon = ({ source, color, size }) => {
  // Map size values to corresponding pixel values
  const sizeMapping = {
    small: 16,
    big: 24,
  };

  // Determine the size or default to "small" if the provided size is not valid
  const iconSize = sizeMapping[size] || sizeMapping.small;

  return (
    <Image
      style={{ tintColor: color, width: iconSize, height: iconSize }}
      resizeMode="contain"
      source={source}
    />
  );
};

Icon.propTypes = {
  source: PropTypes.number.isRequired, // Image source
  color: PropTypes.string.isRequired, // Icon color
  size: PropTypes.oneOf(['small', 'big']).isRequired, // Icon size (valid sizes are "small" and "big")
};

export default Icon;
