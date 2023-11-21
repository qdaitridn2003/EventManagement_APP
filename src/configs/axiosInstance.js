import axios from 'axios';
// import { LOCAL_HOST, PORT, END_POINT } from ';

const LOCAL_HOST = '192.168.1.9';
const END_POINT = '/api';

const axiosInstance = axios.create({
  baseURL: `http://${LOCAL_HOST}:${8080}${END_POINT}`,
});

// export const axiosGet = async (path: string, data: any, config?: AxiosRequestConfig) => {
//     try {
//         const response = await axiosInstance.get(path, { data: data, ...config });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export const axiosPost = async (path: string, data: any, config?: AxiosRequestConfig) => {
//     try {
//         const response = await axiosInstance.post(path, { data: data, ...config });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export const axiosPut = async (path: string, data: any, config?: AxiosRequestConfig) => {
//     try {
//         const response = await axiosInstance.put(path, { data: data, ...config });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export const axiosPatch = async (path: string, data: any, config?: AxiosRequestConfig) => {
//     try {
//         const response = await axiosInstance.patch(path, { data: data, ...config });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export const axiosDel = async (path: string, data: any, config?: AxiosRequestConfig) => {
//     try {
//         const response = await axiosInstance.delete(path, { data: data, ...config });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export const axiosAuthGet = async (
//     path: string,
//     data: any,
//     accessToken: string,
//     config: AxiosRequestConfig,
// ) => {
//     try {
//         const response = await axiosInstance.get(path, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//             data: data,
//             ...config,
//         });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export const axiosAuthPost = async (
//     path: string,
//     data: any,
//     accessToken: string,
//     config: AxiosRequestConfig,
// ) => {
//     try {
//         const response = await axiosInstance.post(path, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//             data: data,
//             ...config,
//         });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export const axiosAuthPut = async (
//     path: string,
//     data: any,
//     accessToken: string,
//     config: AxiosRequestConfig,
// ) => {
//     try {
//         const response = await axiosInstance.put(path, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//             data: data,
//             ...config,
//         });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export const axiosAuthPatch = async (
//     path: string,
//     data: any,
//     accessToken: string,
//     config: AxiosRequestConfig,
// ) => {
//     try {
//         const response = await axiosInstance.patch(path, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//             data: data,
//             ...config,
//         });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export const axiosAuthDel = async (
//     path: string,
//     data: any,
//     accessToken: string,
//     config: AxiosRequestConfig,
// ) => {
//     try {
//         const response = await axiosInstance.delete(path, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//             data: data,
//             ...config,
//         });
//         return response;
//     } catch (error) {
//         const err = error as AxiosError;
//         return err.message;
//     }
// };

// export default axiosInstance;
