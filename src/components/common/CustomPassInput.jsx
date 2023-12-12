import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Color } from '../styles/GlobalStyles';
import { StyleSheet, View, Text } from 'react-native';

import Icon from './Icon';

const CustomPassInput = ({ label, error, iconName, password, onFocus = () => {}, ...props }) => {
  const [isFocused, setIsForcused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={{ width: '100%', marginTop: 20, padding: 2 }}>
      {label && <Text style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 16 }}>{label}</Text>}
      <TextInput
        placeholder=""
        mode="outlined"
        autoCapitalize="none"
        outlineColor="transparent"
        activeOutlineColor={error ? 'transparent' : Color.primary}
        outlineStyle={{ backgroundColor: Color.neutral4, elevation: 4, borderRadius: 16 }}
        contentStyle={{ paddingHorizontal: 24 }}
        style={[styles.textInput, error ? styles.textInputError : null]}
        onFocus={() => {
          onFocus();
          setIsForcused(true);
        }}
        onBlur={() => {
          setIsForcused(false);
        }}
        secureTextEntry={isPasswordVisible}
        left={iconName ? <TextInput.Icon icon={iconName} /> : null}
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            onPress={togglePasswordVisibility}
            color={Color.neutral1}
          />
        }
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

export default CustomPassInput;
