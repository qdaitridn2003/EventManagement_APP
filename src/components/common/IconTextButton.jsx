import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from './Icon';
import { Color, Padding } from '../styles/GlobalStyles';

const IconTextButton = ({
  onPress, label, iconLeft, iconRight, textColor, buttonColor,
  showShadow, isSmall, isFillLayout, style,
}) => {
  const paddingVertical = isSmall ? 8 : 16;
  const paddingHorizontal = isSmall ? 16 : 24;
  const padding = isSmall ? Padding.horizontal16Vetical8 : Padding.horizontal24Vetical16;

  const dynamicStyles = {
    ...padding,
    backgroundColor: buttonColor,
    shadowOpacity: showShadow ? 0.3 : 0,
    elevation: showShadow ? 5 : 0,
  };

  return (
    <TouchableOpacity
      style={[styles.button, dynamicStyles, isFillLayout && styles.fillLayout, style]}
      activeOpacity={0.2}
      onPress={onPress}>
      <View style={styles.contentContainer}>
        {iconLeft && <Icon source={iconLeft} color={textColor} />}
        <View style={styles.textContainer}>
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        </View>
        {iconRight && <Icon source={iconRight} color={textColor} />}
      </View>
    </TouchableOpacity>
  );
};

IconTextButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconLeft: PropTypes.number,
  iconRight: PropTypes.number,
  textColor: PropTypes.string,
  buttonColor: PropTypes.string,
  showShadow: PropTypes.bool,
  isSmall: PropTypes.bool,
  isFillLayout: PropTypes.bool,
  onPress: PropTypes.func,
};

IconTextButton.defaultProps = {
  showShadow: false,
  isSmall: false,
  isFillLayout: false,
  textColor: Color.neutral4,
  buttonColor: Color.primary,
};

const styles = StyleSheet.create({
  button: {
    shadowColor: Color.primary,
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
    marginRight: 8,
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
