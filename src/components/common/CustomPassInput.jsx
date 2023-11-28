import React from 'react';
import { TextInput } from 'react-native-paper';
import { Color } from '../styles/GlobalStyles';
import { View, Text } from 'react-native';

const CustomPassInput = ({ label, ...props }) => {
  return (
    <View style={{ width: '100%' }}>
      {label && <Text style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 16 }}>{label}</Text>}
      <TextInput
        label=""
        mode="outlined"
        outlineColor="transparent"
        activeOutlineColor={Color.primary}
        outlineStyle={{ backgroundColor: Color.neutral4, elevation: 3, borderRadius: 16 }}
        contentStyle={{ paddingHorizontal: 24 }}
        style={{ height: 48, fontSize: 16, width: '100%' }}
        secureTextEntry
        right={<TextInput.Icon icon="eye-outline" color={Color.neutral1} />}
        {...props}
      />
    </View>
  );
};

export default CustomPassInput;
