import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Color } from '../styles/GlobalStyles';

const CustomButton = ({ onPress, title, color, textColor, style, ...props }) => {
  return (
    <View style={style}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, color ? { backgroundColor: color } : null]}
        {...props}
      >
        <Text style={[styles.text, textColor ? { color: textColor } : null]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 48,
    backgroundColor: '#643FDB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Color.neutral1,
    elevation: 5,
    margin: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
