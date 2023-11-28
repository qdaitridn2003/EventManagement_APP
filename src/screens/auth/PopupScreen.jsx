import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosPost } from '../../configs/axiosInstance';
import { useNavigation } from '@react-navigation/native';

import { AppContext } from '../../contexts/AppContext';
import { otpSecretKey } from '../../constant/constant';

const PopupScreen = () => {
  const navigation = useNavigation();
  const { popup } = useContext(AppContext);
  const [isModalVisible, setisModalVisible] = popup;
  const [countdown, setcountdown] = useState(5);
  const [showBtnResendOtp, setShowBtnResendOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const handleBtnResendOtp = () => {
    setShowBtnResendOtp(false);
    setcountdown(5);
  };

  const verifiedAccount = async () => {
    const otpSecret = await AsyncStorage.getItem(otpSecretKey);
    const response = await axiosPost('/auth/verify-otp', { otp: otp, otpSecret: otpSecret });
    console.log(response);
    if (response.auth_id) {
      navigation.navigate('AddEmployee');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setcountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      setShowBtnResendOtp(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [countdown]);
  return (
    <View>
      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <View style={styles.backroundModal}>
          <View style={styles.popup}>
            <Pressable onPress={() => setisModalVisible(false)}>
              <Image style={styles.popupIconClose} source={require('../../assets/closeIcon.png')} />
            </Pressable>
            <View style={styles.viewCenter}>
              <Image
                style={{ width: 80, height: 84 }}
                source={require('../../assets/otpIllustration.png')}
              />
            </View>
            <View style={styles.viewCenter}>
              <Text style={styles.textLargePopup}>Nhập mã OTP</Text>
            </View>
            <View style={styles.viewCenter}>
              <Text style={styles.textSmallPopup}>
                Nhập mã OTP mà chúng tôi vừa gửi đến email của bạn để xác minh tài khoản.
              </Text>
            </View>
            <View style={styles.containerTextInput}>
              <TextInput
                onChangeText={(text) => setOtp(text)}
                keyboardType="numeric"
                caretHidden={true}
                underlineColor="transparent"
                style={styles.textInputOTP}
                placeholder="Enter OTP Code"
              />
            </View>

            <View style={styles.viewCenter}>
              {showBtnResendOtp === true ? (
                <TouchableOpacity onPress={handleBtnResendOtp}>
                  <Text style={styles.textResend1}>Gửi lại mã OTP</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.textResend}>Gửi lại mã OTP</Text>
                  <Text style={styles.textTime}> sau {countdown}s</Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={verifiedAccount}>
              <Text style={styles.text}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PopupScreen;

const styles = StyleSheet.create({
  popup: {
    backgroundColor: '#fff',
    marginVertical: 150,
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 20,
    height: 438,
  },
  backroundModal: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  popupIconClose: {
    marginLeft: 273,
    width: 30,
    height: 30,
  },
  viewCenter: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLargePopup: {
    fontSize: 24,
    fontWeight: '600',
  },
  textSmallPopup: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A29EB6',
    lineHeight: 20,
    textAlign: 'center',
  },
  textInputOTP: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textResend: {
    color: '#1C1243',
    fontSize: 16,
    fontWeight: '500',
  },
  textResend1: {
    color: '#643FDB',
    fontSize: 16,
    fontWeight: '500',
  },
  textTime: {
    color: '#A29EB6',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    marginTop: 16,
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
  containerTextInput: {
    marginTop: 16,
    width: '100%',
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
});
