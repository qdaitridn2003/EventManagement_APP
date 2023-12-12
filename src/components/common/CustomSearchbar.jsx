import React from 'react';
import { Searchbar } from 'react-native-paper';
import { Color } from '../styles/GlobalStyles';

const CustomSearchbar = ({ value, onChangeText, ...props }) => {
  return (
    <Searchbar
      placeholder="Tìm kiếm"
      onChangeText={onChangeText}
      value={value}
      style={{
        flex: 1,
        borderRadius: 16,
        height: 48,
        backgroundColor: Color.neutral4,
        ...props.style, // Allow additional styling
      }}
      rippleColor={Color.primary}
      iconColor={Color.neutral2}
      clearIcon="close-circle-outline"
      elevation={1}
      inputStyle={{ color: Color.primary, ...props.inputStyle }} // Allow additional input styling
      {...props} // Pass any additional props
    />
  );
};

export default CustomSearchbar;
