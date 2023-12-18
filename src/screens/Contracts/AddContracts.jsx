import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

import Calendar from './Calendar';
import { Color, Padding } from '../../components/styles/GlobalStyles';
import { axiosAuthGet, axiosAuthPost } from '../../configs/axiosInstance';
import { accessTokenKey } from '../../constant/constant';

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

const ContentEvent = () => {
  const navigation = useNavigation();
  const [eventValue, setEventValue] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [clientValue, setClientValue] = useState(null);
  const [listClients, setListClients] = useState([]);
  const [listEvents, setListEvents] = useState([]);
  const [contractName, setContractName] = useState('');
  const [contractNote, setContractNote] = useState('');
  const [startDates, setStartDates] = useState();
  const [endDates, setEndDates] = useState();
  const [contractStatus, setContractStatus] = useState('');
  const [attachments, setAttachments] = useState('');
  const [status, setStatus] = useState([]);

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      const response = await axiosAuthGet('/client/get-client-list', accessToken, {
        limit: Infinity,
      });
      console.log(response);
      const handledListClients = await response.listClient.map((item) => {
        return { label: item.fullName, value: item._id };
      });
      setListClients(handledListClients);
    })();
    (async () => {
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      const response = await axiosAuthGet('/event/get-list-event', accessToken, {
        limit: Infinity,
      });
      const handledListEvents = await response.listEvent.map((item) => {
        return { label: item.name, value: item._id };
      });
      setListEvents(handledListEvents);
    })();
  }, []);

  const createContract = async () => {
    try {
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      const response = await axiosAuthPost('/contract/create-contract', accessToken, {
        name: contractName,
        startDate: startDates,
        endDate: endDates,
        status: 'Đang hoạt động',
        note: contractNote,
        clientId: clientValue,
        eventIds: eventValue,
        attachments: JSON.stringify(attachments.split(' ')),
      });
      console.log(response);
      if (response.contract) {
        navigation.navigate('ContractsScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDates(date);
  };

  const handleEndDateChange = (date) => {
    setEndDates(date);
  };

  return (
    <View>
      <Text style={styles.labelInput}>Tên hợp đồng</Text>
      <View style={styles.containerTextInput}>
        <TextInput
          style={styles.textInput}
          value={contractName}
          onChangeText={(text) => setContractName(text)}
          returnKeyType="next"
          placeholder="Tên hợp đồng"
        />
      </View>

      <Text style={styles.labelInput}>Tên sự kiện</Text>
      <MultiSelect
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={listEvents}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={eventValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setEventValue(item);
          setIsFocus(false);
        }}
      />

      <Text style={styles.labelInput}>Tên khách hàng</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={listClients}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={clientValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setClientValue(item.value);
          setIsFocus(false);
        }}
      />

      <View style={styles.statusContainer}>
        <Text style={styles.labelInputStatus}>Trạng thái: </Text>
        <Image source={require('../../assets/icons8-green-dot.png')} style={styles.imageCalendar} />
        <Text style={styles.textStatusGreen}>Đang hoạt động</Text>
      </View>

      <Text style={styles.labelInput}>Bắt đầu</Text>
      <Calendar onSelectDate={handleStartDateChange} />

      <Text style={styles.labelInput}>Kết thúc</Text>
      <Calendar onSelectDate={handleEndDateChange} />

      <Text style={styles.labelInput}>Đính kèm</Text>
      <View style={styles.containerTextInput} />

      <Text style={styles.labelInput}>Ghi chú</Text>
      <View style={styles.containerTextInput}>
        <TextInput
          style={styles.textInput}
          value={contractNote}
          onChangeText={(text) => setContractNote(text)}
          returnKeyType="next"
          placeholder=""
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => createContract()}>
        <Text style={styles.text}>Tạo hợp đồng</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddContracts = () => {
  return (
    <ScrollView style={styles.container}>
      <ToolbarAdd />
      <ContentEvent />
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
    paddingVertical: Padding.p_7xs,
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
  statusContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelInputStatus: {
    color: '#1C1243',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageCalendar: {
    width: 24,
    height: 24,
    marginLeft: 10,
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
    marginBottom: 25,
    height: 48,
    backgroundColor: '#643FDB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddContracts;
