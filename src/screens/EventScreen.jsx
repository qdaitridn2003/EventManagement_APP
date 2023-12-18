import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ToastAndroid, BackHandler } from 'react-native';

import CustomAppbar from '../components/appbar/CustomAppbar';
import EventCard from '../components/card/EventCard';
import CustomSearchbar from '../components/common/CustomSearchbar';
import FilterBar from '../components/common/FilterBar';
import IconButton from '../components/common/IconButton';
import { Color } from '../components/styles/GlobalStyles';
import { getAccessToken } from '../configs/utils/getAccessToken';
import { useAccessToken } from '../services/auth';

const DoubleBackToExit = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (isBackPressedOnce()) {
          BackHandler.exitApp();
          return true;
        } else {
          showToast('Nhấn lần nữa để thoát');
          return true;
        }
      });

      return () => backHandler.remove();
    }, []),
  );

  let lastBackPressed = 0;

  const isBackPressedOnce = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastBackPressed;
    lastBackPressed = currentTime;

    return timeDiff < 2000;
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return null;
};

const listFilter = [
  { status: 'Tất cả' },
  { status: 'Sắp tới' },
  { status: 'Hoàn thành' },
  { status: 'Đang diễn ra' },
  { status: 'Đã hủy' },
];

const renderItem = ({ item }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        console.log('Access Token:', accessToken);
      } else {
        console.log('Access Token not found.');
      }
    };

    fetchData();
  }, []);

  return (
    <EventCard
      style={styles.eventCard}
      imageUrl={item.images[0]}
      title={item.name}
      subtitle="Khai trương"
    />
  );
};

const EventScreen = () => {
  const navigation = useNavigation();

  const accessToken = useAccessToken();

  return (
    <View style={styles.container}>
      <CustomAppbar style={styles.appBar} onPress={() => navigation.navigate('AddEvent')} />

      <View style={styles.searchContainer}>
        <CustomSearchbar />
        <IconButton
          buttonColor={Color.neutral4}
          iconColor={Color.neutral1}
          showShadow
          iconSource={require('../assets/icons/Tune.png')}
          style={{ marginLeft: 8 }}
        />
      </View>

      <FilterBar listTab={listFilter} style={styles.filterBar} />

      {/* <FlatList
        style={styles.flatlist}
        data={data.listEvent}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      /> */}

      <DoubleBackToExit navigation={navigation} />
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Color.neutral4,
  },
  appBar: {
    paddingHorizontal: 20,
  },
  flatlist: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  filterBar: {
    marginBottom: 8,
    marginHorizontal: 1,
    paddingHorizontal: 20,
  },
  eventCard: {
    marginBottom: 16,
    marginHorizontal: 20,
  },
});
