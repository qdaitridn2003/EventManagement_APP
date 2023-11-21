import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { Color } from '../styles/GlobalStyles';

const Icon = ({ source, color, size }) => {
  // Default color if not provided
  const defaultColor = Color.primary;

  // Map size values to corresponding pixel values
  const sizeMapping = {
    small: 16,
    big: 24,
  };

  // Determine the size or default to "big" if the provided size is not valid
  const iconSize = sizeMapping[size] || sizeMapping.big;

  return <Image style={{ tintColor: color, width: iconSize, height: iconSize }} source={source} />;
};

Icon.propTypes = {
  source: PropTypes.number.isRequired, // Image source
  color: PropTypes.string, // Icon color (optional)
  size: PropTypes.oneOf(['small', 'big']),
};

export default Icon;
