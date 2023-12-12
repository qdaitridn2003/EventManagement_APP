/**
 * Custom Axios Hooks for API Requests
 *
 * Use useGet, usePost, usePut, useDelete for requests that DO NOT require access token.
 * I.e.: sign-up, resend-otp, get-list-role, ...
 * 
 * Use useAuthGet, useAuthPost, useAuthPut, useAuthDelete for requests that DO require access token (Authentication).
 * I.e.: create-role, edit-role, delete-role, ...
 * 
 */

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://event-management-api-q3f5.onrender.com/api',
});

const useAxios = async (method, path, { headers, ...config } = {}) => {
  try {
    const result = await axiosInstance.request({
      method,
      url: path,
      headers: headers || {},
      ...config,
    });
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.error('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const useGet = async (path, { headers, ...config } = {}) => {
  return useAxios('GET', path, { headers, ...config });
};

export const usePost = async (path, data, { headers, ...config } = {}) => {
  return useAxios('POST', path, { headers, data, ...config });
};

export const usePut = async (path, data, { headers, ...config } = {}) => {
  return useAxios('PUT', path, { headers, data, ...config });
};

export const useDelete = async (path, { headers, ...config } = {}) => {
  return useAxios('DELETE', path, { headers, ...config });
};

export const useAuthGet = async (path, accessToken, { headers, ...config } = {}) => {
  return useAxios('GET', path, { headers: { ...headers, Authorization: `Bearer ${accessToken}` }, ...config });
};

export const useAuthPost = async (path, accessToken, data, { headers, ...config } = {}) => {
  return useAxios('POST', path, {
    headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    data,
    ...config,
  });
};

export const useAuthPut = async (path, accessToken, data, { headers, ...config } = {}) => {
  return useAxios('PUT', path, {
    headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    data,
    ...config,
  });
};

export const useAuthDelete = async (path, accessToken, { headers, ...config } = {}) => {
  return useAxios('DELETE', path, {
    headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    ...config,
  });
};
