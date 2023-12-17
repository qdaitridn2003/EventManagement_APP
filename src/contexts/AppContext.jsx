import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [data, setIsData] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const popup = [isModalVisible, setisModalVisible];

  const [idEmployee, setIdEmployee] = useState('');
  const dataIdEmployee = [idEmployee, setIdEmployee];
  const [idContract, setIdContract] = useState('');
  const dataIdContract = [idContract, setIdContract];

  const [dataChange, setDataChange] = useState(1);
  const checkData = [dataChange, setDataChange];

  const [pageData, setPageData] = useState(1);
  const pagination = [pageData, setPageData];

  const [isLoading, setIsLoading] = useState(false);
  const loadingFooter = [isLoading, setIsLoading];

  const [isEmployee, setIsEmployee] = useState(false);
  const checkAcount = [isEmployee, setIsEmployee];
  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        data,
        setIsData,
        popup,
        dataIdEmployee,
        checkData,
        pagination,
        loadingFooter,
        checkAcount,
        dataIdContract,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
