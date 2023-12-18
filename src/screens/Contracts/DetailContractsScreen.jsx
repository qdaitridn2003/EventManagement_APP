import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
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

import { Color, FontSize, Padding } from '../../components/styles/GlobalStyles';
import { axiosAuthGet, axiosAuthPut } from '../../configs/axiosInstance';
import { getAccessToken } from '../../configs/utils/getAccessToken';
import { accessTokenKey } from '../../constant/constant';
import { AppContext } from '../../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { widthScreen } = Dimensions.get('window');

const ToolbarDetail = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.toolbarDetail}>
      <TouchableOpacity onPress={goBack}>
        <Image style={styles.backward} source={require('../../assets/icon--backward3x.png')} />
      </TouchableOpacity>
    </View>
  );
};

const ContentContract = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const { dataIdContract } = useContext(AppContext);
  const [idContract] = dataIdContract;
  const [isModalIndicator, setIsModalIndicator] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await axiosAuthGet(
          `/contract/get-detail-contract/${idContract}`,
          accessToken,
        );

        if (response) {
          setIsModalIndicator(false);
          const contract = response.contract;
          setData({
            id: contract._id,
            name: contract.name,
            startDate: contract.startDate,
            endDate: contract.endDate,
            status: contract.status,
          });
        }
      } catch (error) {
        console.log('Error fetching contract details:', error);
      }
    };

    fetchData();
  }, [idContract]);
  console.log(data);

  const handleCancelContract = async () => {
    try {
      setIsCanceling(true);
      const token = await AsyncStorage.getItem(accessTokenKey);
      await axiosAuthPut(`/contract/update-contract/${idContract}`, token, {
        status: 'Đã hủy',
      });

      console.log('Contract update successfully');

      setData((prevData) => ({ ...prevData, status: 'Đã hủy' }));
      navigation.goBack();
    } catch (error) {
      console.log('Error canceling contract:', error);
    } finally {
      setIsCanceling(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View>
      {/* {isModalIndicator && (
        <ActivityIndicator size="large" color={Color.colorText} style={styles.loadingContainer} />
      )}
      {!isModalIndicator && ( */}
      <>
        <Text style={styles.title}>{data.name}</Text>

        {data.status === 'Đang hoạt động' && (
          <View style={styles.statusGreen}>
            <Image
              source={require('../../assets/icons8-green-dot.png')}
              style={styles.imageCalendar}
            />
            <Text style={styles.textStatusGreen}>{data.status}</Text>
          </View>
        )}
        {data.status === 'Đã hủy' && (
          <View style={styles.statusRed}>
            <Image
              source={require('../../assets/icons8-red-dot.png')}
              style={styles.imageCalendar}
            />
            <Text style={styles.textStatusRed}>{data.status}</Text>
          </View>
        )}
        {data.status === 'Hoàn thành' && (
          <View style={styles.statusBlue}>
            <Image
              source={require('../../assets/icons8-blue-dot.png')}
              style={styles.imageCalendar}
            />
            <Text style={styles.textStatusBlue}>{data.status}</Text>
          </View>
        )}

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
          <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
          <Text style={styles.dashboard}>{formatDate(data.startDate)}</Text>
        </View>
        <Text style={styles.labelInput}>Kết thúc</Text>
        <View style={styles.textFlexBox}>
          <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
          <Text style={styles.dashboard}>{formatDate(data.endDate)}</Text>
        </View>
        <Text style={styles.labelInput}>Sự kiện liên quan</Text>
        <View style={styles.containerTextInput}>
          <TextInput style={styles.textInput} returnKeyType="next" placeholder="" />
        </View>
        <Text style={styles.labelInput}>Ghi chú</Text>
        <View style={styles.containerTextInput}>
          <TextInput style={styles.textInput} returnKeyType="next" placeholder="" />
        </View>
        {data.status === 'Đang hoạt động' && (
          <TouchableOpacity
            style={styles.button}
            onPress={handleCancelContract}
            disabled={isCanceling}
          >
            {isCanceling ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.text}>Hủy hợp đồng</Text>
            )}
          </TouchableOpacity>
        )}
      </>
      {/* )} */}
    </View>
  );
};

const DetailContractsScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // setDataLoaded(true);
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
            <ContentContract route={route} />
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
    backgroundColor: Color.overlayRed,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  imageCalendar: {
    marginRight: 5,
    width: 24,
    height: 24,
  },
  textStatusGreen: {
    alignSelf: 'center',
    fontSize: 17,
    marginLeft: 10,
    color: '#009900',
    fontWeight: 'bold',
  },
  textStatusRed: {
    alignSelf: 'center',
    fontSize: 17,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#FF3300',
  },
  textStatusBlue: {
    alignSelf: 'center',
    fontSize: 17,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#3366CC',
  },
  statusGreen: {
    marginTop: 6,
    flexDirection: 'row',
  },
  statusRed: {
    marginTop: 6,
    flexDirection: 'row',
  },
  statusBlue: {
    marginTop: 6,
    flexDirection: 'row',
  },
});

export default DetailContractsScreen;
