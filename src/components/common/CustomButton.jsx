import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ title, color, ...props }) => {
  return (
    <View>
      <TouchableOpacity
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
    marginTop: 20,
    height: 48,
    backgroundColor: '#643FDB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
