import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    return accessToken;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};
