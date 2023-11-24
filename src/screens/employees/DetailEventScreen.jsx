import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Color, FontSize } from '../../components/styles/GlobalStyles';
import BottomSheetModal from '../items/BottomSheetModal';

const { widthScreen } = Dimensions.get('window');
//const { heightScreen } = Dimensions.get('window');

const ToolbarDetail = () => {
  const navigation = useNavigation();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };
  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.toolbarDetail}>
      <TouchableOpacity onPress={goBack}>
        <Image style={styles.backward} source={require('../../assets/icon--backward3x.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={openBottomSheet}>
        <Image style={styles.more} source={require('../../assets/more.png')} />
        <BottomSheetModal isVisible={isBottomSheetVisible} onClose={closeBottomSheet} />
      </TouchableOpacity>
    </View>
  );
};

const ContentDetail = ({ route }) => {
  const eventData = route.params.eventData;

  return (
    <View>
      <Text style={styles.title}>{eventData.name}</Text>
      <View>
        <Text style={styles.nameLabel}>Nhân viên</Text>
        <View style={styles.image}>
          <Image style={styles.avatar} source={require('../../assets/avatar-28x2813x.png')} />
          <Image
            style={styles.avatar}
            contentFit="cover"
            source={require('../../assets/avatar-28x2823x.png')}
          />
          <Image
            style={styles.avatar}
            contentFit="cover"
            source={require('../../assets/avatar-28x283x.png')}
          />
        </View>
      </View>

      <Text style={styles.nameLabel}>Thời gian</Text>
      <View style={styles.time}>
        <View style={styles.calender}>
          <TouchableOpacity>
            <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
          </TouchableOpacity>
          <Text style={styles.textCalendar}>{eventData.startDay}</Text>
        </View>
        <View style={styles.calender}>
          <TouchableOpacity>
            <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
          </TouchableOpacity>
          <Text style={styles.textCalendar}>{eventData.endDay}</Text>
        </View>
      </View>

      <Text style={styles.nameLabel}>Mô tả</Text>
      <Text style={styles.textDetail}>{eventData.detail}</Text>
      <Text style={styles.nameLabel}>Hình ảnh</Text>
      <Image
        style={styles.imageDetail}
        source={require('../../assets/example.jpg')}
        resizeMode="contain"
      />
    </View>
  );
};

const DetailEventScreen = ({ route }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ToolbarDetail />
        <ContentDetail route={route} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  toolbarDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  backward: {
    width: 30,
    height: 30,
    // backgroundColor: Color.overlayRed,
  },
  more: {
    width: 25,
    height: 25,
    alignItems: 'flex-end',
    alignContent: 'center',
  },
  title: {
    fontSize: 24,
    color: Color.colorText,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  nameLabel: {
    fontSize: FontSize.nameLabel,
    color: Color.colorText,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image: {
    flexDirection: 'row',
    margin: 16,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  avatar: {
    width: 55,
    height: 55,
  },
  calender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  textCalendar: {
    marginLeft: 7,
    color: Color.colorText,
    fontWeight: 'bold',
  },
  logoEvent: {
    width: 35,
    height: 35,
  },
  textDetail: {
    fontSize: 16,
    margin: 7,
    color: Color.neutral2,
  },
  imageDetail: {
    width: widthScreen,
    height: undefined,
    aspectRatio: 1,
  },
});

export default DetailEventScreen;
