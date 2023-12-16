import AsyncStorage from '@react-native-async-storage/async-storage';
import { accessTokenKey } from '../../constant/constant';
import { axiosAuthGet } from '../axiosInstance';

export const getEmployeeProfile = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(accessTokenKey);
    const respone = await axiosAuthGet('/employee/get-employee-profile', accessToken);
    return respone;
  } catch (error) {
    console.log(error);
    return null;
  }
};
