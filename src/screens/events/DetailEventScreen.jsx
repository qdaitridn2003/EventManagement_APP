import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import SubHeaderBar from '../../components/headerBar/SubHeaderBar';
import CustomPopup from '../../components/popup/CustomPopup';
import { accessTokenKey } from '../../constant/constant';
import { getAccessToken } from '../../configs/utils/getAccessToken';
import { axiosAuthDel, axiosAuthGet } from '../../configs/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/common/CustomButton';
import Icon from '../../components/common/Icon';
import IconButton from '../../components/common/IconButton';

const DetailEventScreen = ({ route }) => {
  const navigation = useNavigation();
  const { selectedItem } = route.params;
  const [data, setData] = useState(selectedItem);
  const [contract, setContract] = useState('');

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [showEmployeesList, setShowEmployeesList] = useState(false);
  const [showEquipmentList, setShowEquipmentList] = useState(false);
  const [showTranportsList, setShowTranportsList] = useState(false);

  const showPopup = () => setPopupVisible(true);
  const hidePopup = () => setPopupVisible(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem(accessTokenKey);

      const response = await axiosAuthGet(`/event/get-detail-event/${data._id}`, token);

      console.log('Event info:', response);
      setData(response.event);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the screen is focused
    const unsubscribe = navigation.addListener('focus', fetchData);

    // Cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem(accessTokenKey);
      await axiosAuthDel(`/event/delete-event/${data._id}`, token);
      console.log('Event deleted successfully');

      hidePopup();
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigation.navigate('AddEvent', { editData: data });
  };

  // Format the date and time
  const formattedDate = new Date(data.dateTime).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const formattedTime = new Date(data.dateTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <View style={styles.container}>
      <SubHeaderBar
        onBackPress={() => {
          navigation.goBack();
        }}
        onDeletePress={showPopup}
        onEditPress={handleEdit}
      />

      <CustomPopup
        visible={isPopupVisible}
        title="Xác nhận"
        message="Bạn có chắc muốn xóa sự kiện này?"
        onCancel={hidePopup}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Event Status */}
        <View style={styles.statusContainer}>
          <Icon source={require('../../assets/icons/PlayArrow.png')} color={Color.secondary} />
          <Text style={styles.statusText}>{data.status}</Text>
        </View>

        {/* Cover Image */}
        <Image source={{ uri: data.images[0] }} style={styles.image} />

        {/* Service Type */}
        <View style={styles.serviceContainer}>
          <Icon
            source={require('../../assets/icons/Tag.png')}
            color={Color.neutral2}
            size={'small'}
          />
          <Text style={styles.serviceName}>{data.service.name}</Text>
        </View>

        {/* Event Name */}
        <Text style={styles.eventName}>{data.name}</Text>

        {/* Event Scheduled Time */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <IconButton iconSource={require('../../assets/icons/Event.png')} />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 16, color: Color.neutral1 }}>{formattedDate}</Text>
            <Text style={{ fontSize: 14, color: Color.secondary }}>{formattedTime}</Text>
          </View>
        </View>

        {/* Event location */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton iconSource={require('../../assets/icons/Location.png')} />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 16, color: Color.neutral1 }}>123 Lê Đình Lý, Đà Nẵng</Text>
          </View>
        </View>

        {/* Employees */}

        <TouchableOpacity onPress={() => setShowEmployeesList(!showEmployeesList)}>
          <View style={styles.listLabelContainer}>
            <Icon source={require('../../assets/icons/BadgeOutline.png')} color={Color.neutral2} />
            <Text style={styles.labelText}>Nhân viên tham gia</Text>
            <Icon
              source={require('../../assets/icons/KeyboardArrowDown.png')}
              color={Color.neutral1}
            />
          </View>
        </TouchableOpacity>

        {/* Employees */}
        {showEmployeesList && data.employees && data.employees.length > 0 && (
          <>
            {data.employees.map((employee) => (
              <View key={employee._id} style={styles.listItem}>
                <Image source={{ uri: employee.avatar }} style={styles.itemImage} />

                <Text style={styles.itemText}>{employee.fullName}</Text>
              </View>
            ))}
          </>
        )}

        {/* Button to Toggle Equipment List */}
        <TouchableOpacity onPress={() => setShowEquipmentList(!showEquipmentList)}>
          <View style={styles.listLabelContainer}>
            <Icon source={require('../../assets/icons/Box.png')} color={Color.neutral2} />
            <Text style={styles.labelText}>Thiết bị / Vật dụng</Text>
            <Icon
              source={require('../../assets/icons/KeyboardArrowDown.png')}
              color={Color.neutral1}
            />
          </View>
        </TouchableOpacity>

        {/* Equipment List */}
        {showEquipmentList && data.equipments && data.equipments.length > 0 && (
          <>
            {data.equipments.map((equipment) => (
              <View key={equipment._id} style={styles.listItem}>
                {/* Equipment Image */}
                <Image source={{ uri: equipment.image }} style={styles.itemImage} />

                {/* Equipment Name */}
                <Text style={styles.itemText}>{equipment.name}</Text>
              </View>
            ))}
          </>
        )}

        <TouchableOpacity onPress={() => setShowTranportsList(!showTranportsList)}>
          <View style={styles.listLabelContainer}>
            <Icon source={require('../../assets/icons/Car.png')} color={Color.neutral2} />
            <Text style={styles.labelText}>Transports</Text>
            <Icon
              source={require('../../assets/icons/KeyboardArrowDown.png')}
              color={Color.neutral1}
            />
          </View>
        </TouchableOpacity>

        {showTranportsList && data.transports && data.transports.length > 0 && (
          <>
            {data.transports.map((transport) => (
              <View key={transport._id} style={styles.listItem}>
                <Image source={{ uri: transport.image }} style={styles.itemImage} />

                <Text style={styles.itemText}>{transport.name}</Text>
              </View>
            ))}
          </>
        )}

        {/* <CustomButton title={'Hóa đơn'} textColor={Color.secondary} color={Color.neutral4} />
        <CustomButton title={'Thay đổi trạng thái'} style={styles.button} /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutral4,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.secondary,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 16,
  },
  serviceContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  serviceName: {
    marginLeft: 4,
    fontSize: 14,
    color: Color.neutral2,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listLabelContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.neutral2,
    marginLeft: 8,
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemText: {
    fontSize: 14,
    marginLeft: 8,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 90,
  },
  button: {
    marginBottom: 8,
  },
});

export default DetailEventScreen;
