import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ToastAndroid,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

import CustomAppbar from '../components/appbar/CustomAppbar';
import EventCard from '../components/card/EventCard';
import CustomSearchbar from '../components/common/CustomSearchbar';
import FilterBar from '../components/common/FilterBar';
import IconButton from '../components/common/IconButton';
import { Color } from '../components/styles/GlobalStyles';
import { getAccessToken } from '../configs/utils/getAccessToken';
import { axiosAuthGet } from '../configs/axiosInstance';
import { accessTokenKey } from '../constant/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem(accessTokenKey);

      const response = await axiosAuthGet('/event/get-list-event', token);

      console.log('List events: ', response.listEvent);
      setData(response.listEvent);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data when the screen is focused
    const unsubscribe = navigation.addListener('focus', fetchData);

    // Cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  // Handle card press
  const handleCardPress = (item) => {
    // console.log('Card Pressed:', item.name);
    navigation.navigate('DetailEventScreen', { selectedItem: item });
  };

  const handleOverflowPress = (item, menuRef) => {
    setSelectedItem(item);
    menuRef.open();
  };

  const handleMenuSelect = (itemId, option) => {
    // Handle the menu selection for the specified item
    const selectedItem = data.find((item) => item.id === itemId);

    if (selectedItem) {
      if (option === 'save') {
        alert(`Save pressed for ${selectedItem.fullName}`);
      } else if (option === 'delete') {
        alert(`Delete pressed for ${selectedItem.fullName}`);
      }
    }
  };

  // Logic to render each card
  const renderItem = ({ item }) => {
    return (
      <EventCard
        style={styles.eventCard}
        onPress={() => handleCardPress(item)}
        imageUrl={{ uri: item.images[0] }}
        title={item.name}
        subtitle={item.service.name}
      />
    );
  };

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

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="48" color={Color.primary} />
        </View>
      )}

      {error && (
        <View>
          <Text>Error: {error}</Text>
        </View>
      )}

      {!isLoading && !error && (
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} />
      )}

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
