import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Color, FontSize } from '../styles/GlobalStyles';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Icon from './Icon';

const CustomInput = ({ label, iconName, error, onFocus = () => {}, ...props }) => {
  const [isFocused, setIsForcused] = useState(false);
  return (
    <View style={{ width: '100%' }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder=""
        mode="outlined"
        outlineColor="transparent"
        activeOutlineColor={error ? 'transparent' : Color.primary}
        outlineStyle={{
          backgroundColor: Color.neutral4,
          elevation: 4,
          borderRadius: 16,
        }}
        contentStyle={{ paddingHorizontal: 24 }}
        style={[styles.textInput, error ? styles.textInputError : null]}
        onFocus={() => {
          onFocus();
          setIsForcused(true);
        }}
        onBlur={() => {
          setIsForcused(false);
        }}
        {...props}
      />
      {error ? (
        <View style={styles.viewError}>
          <View style={{ marginTop: 2.5 }}>
            <Icon
              source={require('../../assets/icons/ErrorOutline.png')}
              color={Color.semanticRed}
              size={'small'}
            />
          </View>
          <Text style={styles.textError}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textInput: {
    height: 48,
    fontSize: 16,
    width: '100%',
  },
  textInputError: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 16,
  },
  viewError: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 16,
  },
  textError: {
    marginLeft: 5,
    color: Color.semanticRed,
  },
});

export default CustomInput;
