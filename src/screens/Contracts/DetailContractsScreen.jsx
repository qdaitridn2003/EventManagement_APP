import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Color, FontSize, Padding } from '../../components/styles/GlobalStyles';
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
const itemsPosition = [
  { label: 'Sinh nhật', value: 'Sinh nhật' },
  { label: 'Đám cưới', value: 'Đám cưới' },
  { label: 'Hộp mặt', value: 'Bảo vệ' },
];
const ContentEvent = ({ route }) => {
  const eventData = route.params.eventData;
  const navigation = useNavigation();
  const [openDropdown, setopenDropdown] = useState(false);
  const [currentvalue, setcurrentvalue] = useState([]);

  return (
    <View>
      <Text style={styles.title}>{eventData.name}</Text>
      <Text style={styles.status}>{eventData.status}</Text>
      <View>
        <Text style={styles.labelInput}>Chủ hợp đồng</Text>
        <View style={styles.image}>
          <Image
            style={styles.avatar}
            contentFit="cover"
            source={require('../../assets/avatar-28x2823x.png')}
          />
        </View>
      </View>

      <Text style={styles.labelInput}>Bắt đầu</Text>
      <View style={styles.textFlexBox}>
        <TouchableOpacity>
          <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
        </TouchableOpacity>
        <Text style={styles.dashboard}>Thứ ba, 20/09/2023</Text>
      </View>

      <Text style={styles.labelInput}>Kết thúc</Text>
      <View style={styles.textFlexBox}>
        <TouchableOpacity>
          <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
        </TouchableOpacity>
        <Text style={styles.dashboard}>Thứ ba, 20/09/2023</Text>
      </View>

      <Text style={styles.labelInput}>Tên khách hàng</Text>
      <DropDownPicker
        underlineColor
        style={[styles.containerTextInput, { borderWidth: 0, marginTop: 10 }]}
        items={itemsPosition}
        open={openDropdown}
        setOpen={() => setopenDropdown(!openDropdown)}
        value={currentvalue}
        setValue={(val) => setcurrentvalue(val)}
        maxHeight={200}
        autoScroll
        placeholder="Vui lòng chọn"
        showArrowIcon
        showTickIcon
        disableBorderRadius={false}
      />

      <Text style={styles.labelInput}>Sự kiện liên quan</Text>
      <View style={styles.containerTextInput}>
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="" />
      </View>

      <Text style={styles.labelInput}>Ghi chú</Text>
      <View style={styles.containerTextInput}>
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="" />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ContractsScreen')}
      >
        <Text style={styles.text}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const DetailContractsScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Color.colorText} style={styles.loadingContainer} />
        ) : (
          <>
            <ToolbarDetail />
            <ContentEvent route={route} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.colorWhite,
    width: '100%',
    height: 812,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
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
  status: {
    fontSize: 18,
    color: Color.colorText,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    color: Color.colorDarkorange,
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
  textFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboard: {
    fontSize: 16,
    lineHeight: 29,
    textAlign: 'left',
    color: Color.colorMidnightblue,
    fontWeight: '700',
  },
  logoEvent: {
    marginLeft: 8,
    height: 24,
    width: 24,
    margin: 7,
  },
  logoAdd: {
    width: 45,
    height: 45,
  },
  labelInput: {
    marginTop: 16,
    color: '#1C1243',
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerTextInput: {
    marginTop: 6,
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 3,
    overflow: 'hidden',
  },
  button: {
    marginTop: 25,
    height: 48,
    backgroundColor: '#643FDB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default DetailContractsScreen;
