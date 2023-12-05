import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Color, Padding } from '../../components/styles/GlobalStyles';
import MyCalendar from '../items/MyCalendar';

const ToolbarAdd = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.toolbarDetail}>
      <TouchableOpacity onPress={goBack}>
        <Image style={styles.backward} source={require('../../assets/icon--backward3x.png')} />
      </TouchableOpacity>

      <Text style={styles.title}>Tạo hợp đồng</Text>

      <Image style={styles.cancel} source={require('../../assets/icon--right.png')} />
    </View>
  );
};

const itemsPosition = [
  { label: 'Sinh nhật', value: 'Sinh nhật' },
  { label: 'Đám cưới', value: 'Đám cưới' },
  { label: 'Hộp mặt', value: 'Bảo vệ' },
];
const ContentEvent = () => {
  const navigation = useNavigation();
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [openDropdown, setopenDropdown] = useState(false);
  const [currentvalue, setcurrentvalue] = useState([]);

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const handleImageClick = () => {
    Alert.alert('Image Clicked!');
  };

  return (
    <View>
      <Text style={styles.labelInput}>Tên hợp đồng</Text>
      <View style={styles.containerTextInput}>
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="Hợp đồng mua bán" />
      </View>

      <Text style={styles.labelInput}>Tên khách hàng</Text>
      <DropDownPicker
        underlineColor
        style={[styles.containerTextInput, { borderWidth: 0 }]}
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

      <Text style={styles.labelInput}>Ghi chú</Text>
      <View style={styles.containerTextInput}>
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="" />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ContractsScreen')}
      >
        <Text style={styles.text}>Tạo hợp đồng</Text>
      </TouchableOpacity>
    </View>
  );
};
const AddContracts = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ToolbarAdd />
        <ContentEvent />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    width: '100%',
    height: 800,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
  },
  toolbarDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  backward: {
    width: 30,
    height: 30,
  },
  cancel: {
    width: 25,
    height: 25,
    alignItems: 'flex-end',
    alignContent: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: Color.colorText,
  },
  touchable: {
    alignItems: 'center',
  },
  labelInput: {
    marginTop: 16,
    color: '#1C1243',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatar: {
    width: 100,
    height: 100,
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
  iconUsername: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginLeft: 24,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 20,
  },

  calendarContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
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
  dropDown: {
    marginEnd: 10,
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
});

export default AddContracts;
