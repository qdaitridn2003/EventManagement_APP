import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';

import { Color, Padding } from '../../components/styles/GlobalStyles';

const { height, width } = Dimensions.get('window');

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const Toolbar = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleImageClick = () => {
    Alert.alert('Image Clicked!');
  };
  return (
    <View style={{ flexDirection: 'column' }}>
      <TouchableOpacity onPress={goBack}>
        <Image style={styles.backward} source={require('../../assets/icon--backward3x.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <Image
          style={styles.avatar}
          resizeMode="cover"
          source={require('../../assets/avatar-28x283x.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const ContentProfile = () => {
  // const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.labelInput}>Họ và tên</Text>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../../assets/icons8-profile-50.png')}
        />
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="Team Cook" />
      </View>
      <Text style={styles.labelInput}>Email</Text>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../../assets/icon--alternate-email3x.png')}
        />
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="abc@gmail.com" />
      </View>
      <Text style={styles.labelInput}>Chức vụ</Text>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../../assets/icons8-profile-50.png')}
        />
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="Chụp ảnh" />
      </View>
      <Text style={styles.labelInput}>Số điện thoại</Text>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../../assets/phone-android.png')}
        />
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="0912342667" />
      </View>
      <Text style={styles.labelInput}>Địa chỉ</Text>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../../assets/address.png')}
        />
        <TextInput
          style={styles.textInput}
          returnKeyType="next"
          placeholder="137 Nguyễn Thị Thập"
        />
      </View>
      <Text style={styles.labelInput}>Ghi chú</Text>
      <View style={styles.containerTextInput}>
        <TextInput style={styles.textInput} returnKeyType="next" />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
};

const DetailProfileScreen = () => {
  const navigation = useNavigation();
  const [permissions, setPermissions] = useState();
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissions(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Image Picker Result:', result);

    if (!result.cancelled) {
      if (result.uri) {
        console.log('Image URI:', result.uri);
        setImage(result.uri);
      } else {
        console.error('Image URI is undefined in the result object.');
      }
    } else {
      console.log('Image picking cancelled.');
    }
  };

  if (permissions === false) {
    return <Text>Không được cấp quyền</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <MyStatusBar backgroundColor={Color.colorMidnightblue} />
        <Toolbar />
        <ContentProfile />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    width: '100%',
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_5xl,
  },
  contentProfile: {
    width: '100%',
    height: 812,
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_5xl,
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  backward: {
    width: 30,
    height: 30,
  },
  textInfo: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    top: 15,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTextInput: {
    marginTop: 6,
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
  },
  button: {
    marginTop: 22,
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

export default DetailProfileScreen;
