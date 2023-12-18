import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { Color } from '../../components/styles/GlobalStyles';
import SubHeaderBar from '../../components/headerBar/SubHeaderBar';
import { accessTokenKey } from '../../constant/constant';
import { axiosAuthGet, axiosAuthPost, axiosAuthPut } from '../../configs/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/common/CustomInput';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import IconButton from '../../components/common/IconButton';
import CustomButton from '../../components/common/CustomButton';
import { Picker } from '@react-native-picker/picker';

const AddEvent = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { editData } = route.params || {};

  const [name, setName] = useState(editData?.name || '');
  const [serviceId, setServiceId] = useState(editData?.service.name || '');
  const [employeeIds, setEmployeeIds] = useState(editData?.employees || '');
  const [equipmentIds, setEquipmentIds] = useState(editData?.equipments || '');
  const [date, setDate] = useState(editData?.dateTime || '');
  const [contractId, setContractId] = useState(editData?.contract._id || '');

  const [contracts, setContracts] = useState('');
  const [services, setServices] = useState('');
  const [transports, setTransports] = useState('');
  const [equipments, setEquipments] = useState('');

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const token = await AsyncStorage.getItem(accessTokenKey);
        const response1 = await axiosAuthGet(`/contract/get-list-contract`, token);

        setContracts(response1.listContract);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const token = await AsyncStorage.getItem(accessTokenKey);
        const response1 = await axiosAuthGet(`/service/get-list-service`, token);

        setServices(response1.listService);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchTransports = async () => {
      try {
        const token = await AsyncStorage.getItem(accessTokenKey);
        const response1 = await axiosAuthGet(`/transport/get-list-transport`, token);

        setTransports(response1.listTransport);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchEquipments = async () => {
      try {
        const token = await AsyncStorage.getItem(accessTokenKey);
        const response4 = await axiosAuthGet(`/item/get-list-item`, token);

        setEquipments(response4.listItem);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchContracts();
    fetchServices();
    fetchTransports();
    fetchEquipments();
  }, []);

  const handleDateConfirm = (date) => {
    // Format the selected date to '2023-11-11T00:00:00.000Z'
    const formattedDate = moment(date).toISOString();
    setDateOfBirth(formattedDate);
    setDatePickerVisibility(false);
  };

  const addNewClient = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem(accessTokenKey);
      await axiosAuthPost('/event/create-event', token, {
        name,
        serviceIds: '65748b23e4ce18d992b2e051',
        date,
      });

      console.log('Event added successfully');

      navigation.goBack();
    } catch (error) {
      console.error('Error adding event:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem(accessTokenKey);
      await axiosAuthPut(`/event/update-event/${editData._id}`, token, {
        name,
        date,
      });

      console.log('Event updated successfully');

      navigation.goBack();
    } catch (error) {
      console.error('Error updating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SubHeaderBar
        title={editData ? 'Sửa sự kiện' : 'Thêm sự kiện'}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <CustomInput
          label={'Tên sự kiện'}
          placeholder="Tên gọi của sự kiện"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <CustomInput label={'Hợp đồng'} placeholder="Tên hợp đồng" />

        <CustomInput
          label={'Loại dịch vụ'}
          placeholder="Tên dịch vụ"
          onChangeText={(text) => setServiceId(text)}
        />

        {/* Date and time */}
        <Text style={styles.label}>Thời gian diễn ra</Text>
        <View style={styles.datePicker}>
          <IconButton
            iconSource={require('../../assets/icons/Event.png')}
            isSizeSmall={true}
            onPress={() => setDate(true)}
          />

          {/* Display selected date in DD-MM-YYYY format */}
          <Text style={styles.datePickerText}>
            {date ? moment(date).format('DD-MM-YYYY') : 'Chọn ngày và giờ'}
          </Text>
        </View>

        {/* Location */}
        <CustomInput label={'Địa chỉ'} placeholder="Số nhà, tên đường, quận, thành phố" />

        <CustomInput label={'Phương tiện vận chuyển'} placeholder="Thêm phương tiện" />

        <CustomInput
          label={'Thiết bị / Vật dụng'}
          placeholder="Thêm thiết bị / vật dụng"
          onChangeText={(text) => setEquipmentIds(text)}
        />

        {/* Add client button */}
        <CustomButton
          title={editData ? 'Lưu thay đổi' : 'Thêm sự kiện'}
          onPress={editData ? updateClient : addNewClient}
        />
      </ScrollView>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(2000, 0, 1)}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutral4,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  label: {
    marginVertical: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default AddEvent;
