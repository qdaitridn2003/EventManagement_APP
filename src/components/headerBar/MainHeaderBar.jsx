import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../common/Icon';
import IconButton from '../common/IconButton';
import { Color } from '../styles/GlobalStyles';

const MainHeaderBar = ({ title, iconSource, onButtonPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Left Icon */}
      <Icon source={iconSource} color={Color.neutral1} />

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Button */}
      <IconButton iconSource={require('../../assets/icons/Plus.png')} onPress={onButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.neutral4,
  },
  title: {
    marginLeft: 8,
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MainHeaderBar;
