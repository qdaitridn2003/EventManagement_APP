import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import Icon from './Icon';
import { Color } from '../styles/GlobalStyles';

const IconButton = ({ 
  onPress, iconSource, iconColor, buttonColor, 
  isSizeSmall, showShadow, style 
}) => {
  const padding = isSizeSmall ? 8 : 12;
  const borderRadius = isSizeSmall ? 12 : 16;

  const dynamicStyles = {
    padding,
    borderRadius,
    backgroundColor: buttonColor,
    shadowOpacity: showShadow ? 0.3 : 0,
    elevation: showShadow ? 5 : 0,
  };

  return (
    <TouchableOpacity
      style={[styles.iconButton, dynamicStyles, style,]}
      activeOpacity={0.2}
      onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon source={iconSource} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  onPress: PropTypes.func,
  iconSource: PropTypes.number.isRequired,
  iconColor: PropTypes.string,
  isSizeSmall: PropTypes.bool,
  buttonColor: PropTypes.string,
  showShadow: PropTypes.bool,
  style: PropTypes.object,
};

IconButton.defaultProps = {
  showShadow: false,
  isSizeSmall: false,
  iconColor: Color.neutral4,
  buttonColor: Color.primary,
}

const styles = StyleSheet.create({
  iconButton: {
    shadowColor: Color.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;
