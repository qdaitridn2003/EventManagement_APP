import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useGet, usePost, usePut, useAuthGet, useAuthPut, useAuthDelete } from '../../services/api';
import { useAccessToken } from '../../services/auth';

const APITestScreen = () => {
  
  const accessToken = useAccessToken();

  useEffect(() => {
    /*
    GET list role (OK)
    */
    // const fetchData = async () => {
    //   const result = await useGet('/role/get-list-role');
    //   console.log('GET Data Result:', result);
    // };
    // fetchData();

    /*
    POST Sign-up (OK)
    */
    // const signUp = async () => {
    //   try {
    //     const result = await usePost('/auth/sign-up', {
    //       username: 'testing@gmail.com',
    //       password: '123456789',
    //       confirmPassword: '123456789',
    //       roleId: '65605b22760a95942302cadd', // Employee
    //     });

    //     console.log('Sign Up Result:', result);
    //   } catch (error) {
    //     console.error('Error signing up:', error);
    //   }
    // };
    // signUp();

    // REQUIRED ACCESSTOKEN

    /*
    PUT Change-password (OK)
    */
    // const changePassword = async () => {
    //   try {
    //     const result = await useAuthPut('/auth/change-password', accessToken, {
    //         oldPassword: '123456',
    //         newPassword: '1234567',
    //         confirmPassword: '1234567',
    //     });

    //     console.log('Change Password Result:', result);
    //   } catch (error) {
    //     console.error('Error changing password:', error);
    //   }
    // };
    // changePassword();

    // const updateService = async () => {
    //   try {
    //     const result = await useAuthPut('/service/update-service/656ebd80a5eb9f2856f611ed', accessToken, {
    //         name: 'Dọn dẹp 9sdfsdf',
    //         description: 'Mổ tả của dịch vụ dọn dẹp.',
    //     });

    //     console.log('Update Service Result:', result);
    //   } catch (error) {
    //     console.error('Error updating service:', error);
    //   }
    // };
    // updateService();

    /*
    DELETE Service (OK)
    */
    // const deleteService = async () => {
    //   try {
    //     const result = await useAuthDelete('/service/delete-service/6572d1235fb267c7f5cb679a', accessToken);

    //     console.log('Delete Service Result:', result);
    //   } catch (error) {
    //     console.error('Error deleting service:', error);
    //   }
    // };
    // deleteService();

    /*
    GET Client List (OK)
    */
    // const fetchData = async () => {
    //   try {
    //     const result = await useAuthGet('/client/get-client-list', accessToken, {
    //         limit: '',
    //         page: '',
    //         search: '',
    //     });

    //     console.log('Auth GET Client List Result:', result);
    //   } catch (error) {
    //     console.error('Error fetching client list:', error);
    //   }
    // };
    // fetchData();
    
  }, [accessToken]);

  return (
    <View>
      <Text>This is API Test Screen</Text>
    </View>
  );
};

export default APITestScreen;