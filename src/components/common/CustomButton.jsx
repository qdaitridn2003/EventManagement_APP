import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ title, color, onPress, ...props }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, color ? { backgroundColor: color } : null]}
        {...props}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 16,
    height: 48,
    backgroundColor: '#643FDB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
