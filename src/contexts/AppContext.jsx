import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [data, setIsData] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const popup = [isModalVisible, setisModalVisible];

  const [idEmployee, setIdEmployee] = useState('avc');
  const dataIdEmployee = [idEmployee, setIdEmployee];
  const [idContract, setIdContract] = useState('avc');
  const dataIdContract = [idContract, setIdContract];

  return (
    <AppContext.Provider
      value={{ isLogin, setIsLogin, data, setIsData, popup, dataIdEmployee, dataIdContract }}
    >
      {children}
    </AppContext.Provider>
  );
};
