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
} from 'react-native';
import { Color } from '../components/styles/GlobalStyles';
import CustomAppbar from '../components/appbar/CustomAppbar';
import CustomSearchbar from '../components/common/CustomSearchbar';
import IconButton from '../components/common/IconButton';
import FilterBar from '../components/common/FilterBar';
import { getAccessToken } from '../configs/utils/getAccessToken';
import EventCard from '../components/card/EventCard';

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
  return (
    <EventCard
      style={styles.eventCard}
      imageUrl={item.images[0]}
      title={item.name}
      subtitle={'Khai trương'}
    />
  );
};

// EventScreen component
const EventScreen = () => {

  const navigation = useNavigation();

  const [data, setData] = useState({
    listEvent: [
      {
        _id: '656ebb2fa5eb9f2856f611cc',
        name: 'Khai trương cửa hàng',
        contract: {
          _id: '656eba94a5eb9f2856f611b9',
          name: 'Công ty Việt Hoàng',
          startDate: '2023-01-05T00:00:00.000Z',
          endDate: '2023-03-09T00:00:00.000Z',
          payment: '656eba94a5eb9f2856f611b7',
          status: 'active',
          note: 'note',
          attachments: ['https://example.com'],
        },
        services: [],
        employees: [],
        timelines: [],
        equipments: [],
        dateTime: '2023-11-11T06:48:25.462Z',
        attachments: [],
        images: ['https://i.imgur.com/Uc89OdN.png'],
      },
      {
        _id: '656ebc96a5eb9f2856f611dc',
        name: 'Dọn dẹp',
        contract: {
          _id: '656eba94a5eb9f2856f611b9',
          name: 'Công ty Việt Hoàng',
          startDate: '2023-01-05T00:00:00.000Z',
          endDate: '2023-03-09T00:00:00.000Z',
          payment: '656eba94a5eb9f2856f611b7',
          status: 'active',
          note: 'note',
          attachments: ['https://example.com'],
        },
        services: [],
        employees: [],
        timelines: [],
        equipments: [],
        dateTime: '2023-11-12T06:48:25.462Z',
        attachments: [],
        images: ['https://i.imgur.com/Uc89OdN.png'],
      },
    ],
    totalEvent: 2,
  });

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
    <View style={styles.container}>

      <CustomAppbar 
        style={styles.appBar} 
        onPress={() => navigation.navigate('AddEvent')} 
        />

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

      <FlatList
        style={styles.flatlist}
        data={data.listEvent}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

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
  }
});
