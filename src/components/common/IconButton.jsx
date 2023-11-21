import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import Icon from './Icon';

const IconButton = ({ onPress, iconSource, iconColor, size, buttonColor, style }) => {
  const paddingSize = size === 'small' ? 8 : 12;

  return (
    <TouchableOpacity
      style={[
        styles.iconButton,
        { width: 2 * paddingSize + 24, height: 2 * paddingSize + 24, backgroundColor: buttonColor },
        style,
      ]}
      activeOpacity={0.2}
      onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon source={iconSource} color={iconColor} size="big" />
      </View>
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconSource: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'default']),
  buttonColor: PropTypes.string.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
});

export default IconButton;
