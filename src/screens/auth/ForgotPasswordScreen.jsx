import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

import PopupScreen from './PopupScreen.jsx';
import { Color, Padding } from '../../components/styles/GlobalStyles.js';
import { AppContext } from '../../contexts/AppContext.jsx';

const ForgotPasswordScreen = props => {
  const navigation = useNavigation();
  const { popup } = useContext(AppContext);
  const [isModalVisible, setisModalVisible] = popup;

  const handleBtnSendEmail = () => {
    setisModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image source={require('../../assets/icon--backward3x.png')} style={styles.btnBack} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../assets/illustration.png')} />
      </View>
      <View style={styles.containerText}>
        <Text style={styles.content}>Khôi phục mật khẩu</Text>
      </View>
      <View style={styles.containerDescription}>
        <Text style={styles.description}>
          Vui lòng nhập địa chỉ email của bạn để nhận được email khôi phục mật khẩu.
        </Text>
      </View>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../../assets/icon--alternate-email3x.png')}
        />
        <TextInput
          underlineColor="transparent"
          style={styles.textInput}
          returnKeyType="next"
          placeholder="Email"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBtnSendEmail}>
        <Text style={styles.text}>Gửi email khôi phục</Text>
      </TouchableOpacity>

      {isModalVisible === true ? <PopupScreen /> : null}
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    width: '100%',
    height: 812,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
  },
  btnBack: {
    width: 40,
    height: 40,
  },
  imageContainer: {
    marginTop: 16,
    overflow: 'hidden',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  image: {
    width: 121,
    height: 121,
  },
  containerText: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
  },
  content: {
    fontSize: 24,
    fontWeight: '600',
  },
  containerDescription: {
    justifyContent: 'center',
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#A29EB6',
    width: 297,
    fontWeight: '500',
    textAlign: 'center',
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
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    borderBottomWidth: 0,
    fontWeight: 'bold',
  },
  iconUsername: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginLeft: 24,
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
});
