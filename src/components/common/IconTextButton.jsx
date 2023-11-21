import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from './Icon';

const IconTextButton = ({
  label,
  iconSource,
  textColor,
  iconColor,
  buttonColor,
  showShadow,
  isBig,
  isFillLayout,
  onPress,
}) => {
  const paddingVertical = isBig ? (isFillLayout ? 12 : 8) : 8;
  const paddingHorizontal = isBig ? (isFillLayout ? 24 : 16) : 16;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          paddingVertical,
          paddingHorizontal,
          backgroundColor: buttonColor,
          shadowOpacity: showShadow ? 0.3 : 0,
          elevation: showShadow ? 5 : 0,
        },
        isFillLayout && styles.fillLayout,
      ]}
      activeOpacity={0.2}
      onPress={onPress}>
      <View style={styles.contentContainer}>
        <Icon source={iconSource} color={iconColor} />
        <View style={styles.textContainer}>
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

IconTextButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconSource: PropTypes.number.isRequired,
  textColor: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  showShadow: PropTypes.bool,
  isBig: PropTypes.bool,
  isFillLayout: PropTypes.bool,
  onPress: PropTypes.func,
};

IconTextButton.defaultProps = {
  showShadow: true,
  isBig: true,
  isFillLayout: false,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500', // Medium
  },
  fillLayout: {
    width: '100%',
  },
});

export default IconTextButton;
