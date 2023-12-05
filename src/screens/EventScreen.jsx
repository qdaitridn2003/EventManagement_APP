import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
} from 'react-native';

import DumyDataEvent from './events/DummyDataEvent';
import ItemListEvent from './events/ItemListEvent';
import { Padding, Color, FontSize, Border } from '../components/styles/GlobalStyles';
import CustomAppbar from '../components/appbar/CustomAppbar';
import CustomSearchbar from '../components/common/CustomSearchbar';
import IconButton from '../components/common/IconButton';
import FilterBar from '../components/common/FilterBar';
import { getAccessToken } from '../configs/utils/getAccessToken';
import EventCard from '../components/card/EventCard';

// EventHeader component
const EventHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Sự kiện</Text>
        <Image style={styles.logoEvent} source={require('../assets/icon--event2.png')} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('AddEvent')}>
        <Image style={styles.buttonFab} source={require('../assets/plus-icon.png')} />
      </TouchableOpacity>
    </View>
  );
};

// SearchEvent component
const SearchEvent = () => (
  <View style={styles.searchEvent}>
    <Image style={styles.imageSearch} source={require('../assets/vector.png')} />
    <View style={[styles.text, styles.inputSearch]}>
      <Text style={[styles.search, styles.text1Clr]}>Tìm kiếm sự kiện</Text>
    </View>
    <Image
      style={[styles.vectorIcon1, styles.imageTune]}
      source={require('../assets/tune-icon.png')}
    />
  </View>
);

// TabBar component
const TabBar = () => (
  <View style={styles.containerTabBar}>
    <View style={styles.tabBar}>
      <View style={styles.tabAll}>
        <Text onClick style={styles.btnTabAll}>
          Tất cả
        </Text>
      </View>
      <View style={styles.tabBarCompleted}>
        <Text style={styles.btnCompleted}>Hoàn thành</Text>
      </View>
      <View style={styles.tabUncompleted}>
        <Text style={styles.btnUnCompleted}>Chưa</Text>
      </View>
    </View>
  </View>
);

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
      imageUrl={{ uri: 'https://picsum.photos/300/200' }}
      title={item.name}
      subtitle={'Khai trương'}
    />
  );

  // <View key={item._id}>
  //   <Text>{item.name}</Text>
  //   {item.images.length > 0 && (
  //     <Image style={{ width: 100, height: 100 }} source={{ uri: item.images[0] }} />
  //   )}
  // </View>
};

// EventScreen component
const EventScreen = () => {
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
        images: ['https://picsum.photos/300/200'],
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
        images: ['https://picsum.photos/300/200'],
      },
    ],
    totalEvent: 2,
  });

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
    <View style={styles.container}>
      {/* <EventHeader /> */}
      {/* <SearchEvent /> */}
      <CustomAppbar onPress={() => navigation.navigate('AddEvent')} />
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
        data={data.listEvent}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        style={styles.flatlist}
      />

      {/* <FlatList
        data={DumyDataEvent}
        renderItem={({ item }) => <ItemListEvent data={item} />}
        keyExtractor={(item) => item.id}
        style={{ height: '100%', width: '100%' }}
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
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    backgroundColor: Color.neutral4,
  },
  flatlist: {
    flex: 1,
  },
  nameScreenAndBtnAdd: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboard: {
    fontSize: FontSize.title24Bold_size,
    lineHeight: 29,
    textAlign: 'left',
    color: Color.colorMidnightblue,
    fontWeight: '700',
  },
  logoEvent: {
    marginLeft: 8,
    height: 24,
    width: 24,
  },
  buttonFab: {
    width: 44,
    height: 44,
    overflow: 'hidden',
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorBlueviolet,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  filterBar: {
    marginBottom: 8,
    marginHorizontal: 1,
  },
  searchEvent: {
    height: 48,
    paddingVertical: 0,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Padding.p_5xl,
    borderRadius: Border.br_base,
    alignSelf: 'stretch',
    backgroundColor: Color.colorWhite,
    elevation: 10,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 100 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  imageSearch: {
    height: 20,
    width: 20,
  },
  imageTune: {
    height: 20,
    width: 20,
    marginLeft: 16,
  },
  inputSearch: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerTabBar: {
    width: 313,
    height: 40,
    marginTop: 16,
  },
  tabBar: {
    left: 0,
    top: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabAll: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnTabAll: {
    fontWeight: '500',
    color: Color.neutral2,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    textAlign: 'left',
  },
  tabBarCompleted: {
    backgroundColor: Color.colorBlueviolet,
    marginLeft: 16,
    borderRadius: Border.br_xs,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCompleted: {
    textAlign: 'right',
    color: Color.colorWhite,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    fontWeight: '700',
  },
  tabUncompleted: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  btnUnCompleted: {
    fontWeight: '500',
    color: Color.neutral2,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    textAlign: 'left',
  },
});
