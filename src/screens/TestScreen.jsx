import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../components/common/IconButton';
import { Color, Padding, FontSize } from '../components/styles/GlobalStyles';

const TestScreen = () => {
  const handleButtonPress = () => {
    // Handle button press
    console.log('Button Pressed!');
  };

  return (
    <View style={styles.container}>
      <IconButton
        onPress={handleButtonPress}
        iconSource={require('../assets/icons/BadgeOutline.png')}
        iconColor={Color.neutral4}
        size="small"
        buttonColor={Color.secondary}
        style={styles.buttonStyle}
      />
      <IconButton
        onPress={handleButtonPress}
        iconSource={require('../assets/icons/BadgeOutline.png')}
        iconColor="blue"
        buttonColor="#ff9900"
        style={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonStyle: {
    marginTop: 20,
  },
});

export default TestScreen;
