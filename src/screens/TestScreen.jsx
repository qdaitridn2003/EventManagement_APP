import React from 'react';
import { View, StyleSheet } from 'react-native';

import IconButton from '../components/common/IconButton';
import IconTextButton from '../components/common/IconTextButton';
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

      <IconTextButton
        onPress={handleButtonPress}
        label="Button 1"
        iconLeft={require('../assets/icons/Plus.png')}
        iconRight={require('../assets/icons/BadgeOutline.png')}
        textColor={Color.neutral1}
        buttonColor={Color.primary}
        showShadow
        isSmall={false}
        isFillLayout={false}
      />

      <IconTextButton
        onPress={handleButtonPress}
        label="Button 2"
        iconLeft={require('../assets/icons/Edit.png')}
        textColor={Color.primary}
        buttonColor={Color.secondary}
        showShadow
        isFillLayout={false}
      />

      <IconTextButton
        onPress={handleButtonPress}
        label="Button 3"
        iconRight={require('../assets/icons/Check.png')}
        isFillLayout
        showShadow
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
