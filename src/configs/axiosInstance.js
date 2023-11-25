import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://event-management-api-q3f5.onrender.com/api',
});

export const axiosGet = async (path, query, config) => {
  try {
    const result = await axiosInstance.get(path, { ...config, params: query });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosPost = async (path, data, config) => {
  try {
    const result = await axiosInstance.post(path, data, { ...config });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosPut = async (path, data, config) => {
  try {
    const result = await axiosInstance.put(path, data, { ...config });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosDel = async (path, query, config) => {
  try {
    const result = await axiosInstance.delete(path, { ...config, params: query });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosAuthGet = async (path, accessToken, query, config) => {
  try {
    const result = await axiosInstance.delete(path, {
      ...config,
      params: query,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosAuthPost = async (path, accessToken, data, config) => {
  try {
    const result = await axiosInstance.post(path, {
      ...config,
      data,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosAuthPut = async (path, accessToken, data, config) => {
  try {
    const result = await axiosInstance.put(path, {
      ...config,
      data,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};

export const axiosAuthDel = async (path, accessToken, query, config) => {
  try {
    const result = await axiosInstance.delete(path, {
      ...config,
      params: query,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return result.data.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.log('Axios Error:', error.message);
      return { message: 'An error has occurred', status: 'failure' };
    }
  }
};
