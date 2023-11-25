import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconTextButton from '../components/common/IconTextButton';
import { Color, Padding, FontSize } from '../components/styles/GlobalStyles';
import { Icon } from 'react-native-paper';
import { Avatar, TextInput, Searchbar } from 'react-native-paper';
import CustomInput from '../components/common/CustomInput';
import CustomPassInput from '../components/common/CustomPassInput';
import CustomSearchbar from '../components/common/CustomSearchbar';
import CustomAppbar from '../components/appbar/CustomAppbar';
import FilterBar from '../components/common/FilterBar';
import AvatarRow from '../components/common/AvatarRow';
import EventCard from '../components/card/EventCard';

const TestScreen = () => {
  const handleButtonPress = () => {
    // Handle button press
    console.log('Button Pressed!');
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  const filters = [
    { label: 'Filter 1' },
    { label: 'Filter 2' },
    { label: 'Filter 3' },
    { label: 'Filter 4' },
    { label: 'Filter 5' },
    { label: 'Filter 6' },
    { label: 'Filter 7' },
    // Add more filters as needed
  ];

  const handleFilterPress = (filter) => {
    // Handle filter press
    console.log('Filter pressed:', filter.label);
  };

  const listTab = [
    { status: 'Tất cả' },
    { status: 'Sắp tới' },
    { status: 'Hoàn thành' },
    { status: 'Đang diễn ra' },
    { status: 'Đã hủy' },
  ];

  const avatars = [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    // Add more avatar URLs as needed
  ];

  return (
    <View style={styles.container}>
      <FilterBar listTab={listTab} />

      <AvatarRow
        avatars={avatars}
        showBorder
        borderThickness={2}
        avatarSize={48}
        overlap
        maxAvatars={4}
      />

      <EventCard
        imageUrl={'https://i.imgur.com/Uc89OdN.png'}
        subtitle={'ABC ABC ABC ABC ABC ABC'}
        title={'Hello Hello Hello Hello HelloHelloHelloHelloHello'}
      />

      {/* <CustomAppbar/>

      <CustomSearchbar />

      <CustomInput label='Test'/>

      <CustomPassInput label='hi' /> */}
      {/* <Avatar.Image
        source={{ uri:'https://picsum.photos/200' }}
        size={150}
        style={styles.avatar} */}
      {/* /> */}
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
    flex: 1,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
