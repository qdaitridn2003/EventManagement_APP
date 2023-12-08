import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('access_token');
        setAccessToken(storedAccessToken);
        console.log('Access Token:', storedAccessToken);
      } catch (error) {
        console.error('Error retrieving access token:', error);
        setAccessToken(null);
      }
    };

    fetchAccessToken();
  }, []);

  return accessToken;
};
