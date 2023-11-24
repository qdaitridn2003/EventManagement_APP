import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import IconButton from '../components/common/IconButton';
import IconTextButton from '../components/common/IconTextButton';
import { Color, Padding, FontSize } from '../components/styles/GlobalStyles';
import Icon from '../components/common/Icon';
import { Avatar, TextInput, Searchbar } from 'react-native-paper';
import CustomInput from '../components/common/CustomInput';
import CustomPassInput from '../components/common/CustomPassInput';
import CustomSearchbar from '../components/common/CustomSearchbar';
import CustomAppbar from '../components/appbar/CustomAppbar';

const TestScreen = () => {
  const handleButtonPress = () => {
    // Handle button press
    console.log('Button Pressed!');
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <CustomAppbar/>

      <CustomInput label='Test'/>

      <CustomPassInput label='hi' />
      <Avatar.Image
        source={{ uri:'https://picsum.photos/200' }}
        size={150}
        style={styles.avatar}
      />
      {/* <Icon 
        source={require('../assets/icons/BadgeOutline.png')}
        color={Color.primary}
        size={'small'}
      />
      <Icon 
        source={require('../assets/icons/BadgeOutline.png')}
        color={Color.secondary}
      />
      <Icon 
        source={require('../assets/icons/Check.png')}
      />
      <IconButton
        onPress={handleButtonPress}
        iconSource={require('../assets/icons/BadgeOutline.png')}
        style={styles.buttonStyle}
        showShadow
      />
      <IconButton
        onPress={handleButtonPress}
        iconSource={require('../assets/icons/BadgeOutline.png')}
        isSizeSmall
        style={styles.buttonStyle}
      />

      <IconTextButton
        onPress={handleButtonPress}
        label="Button 1"
        iconLeft={require('../assets/icons/Plus.png')}
        iconRight={require('../assets/icons/BadgeOutline.png')}
        buttonColor={Color.primary}
        showShadow
        isSmall={false}
        isFillLayout={false}
        style={styles.buttonStyle}
      />

      <IconTextButton
        onPress={handleButtonPress}
        label="Button 2"
        iconLeft={require('../assets/icons/Edit.png')}
        textColor={Color.primary}
        buttonColor={Color.secondary}
        showShadow
        isFillLayout={false}
        style={styles.buttonStyle}
      />

      <IconTextButton
        onPress={handleButtonPress}
        label="Button 3"
        iconRight={require('../assets/icons/Check.png')}
        isFillLayout
        showShadow
        style={styles.buttonStyle}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  buttonStyle: {
    marginBottom: 16,
  },
  avatar: {
    borderWidth: 2,
    borderColor: 'white',
  },
  inputStyle1: {
    marginBottom: 20,
    height:48,
  },
});

export default TestScreen;
