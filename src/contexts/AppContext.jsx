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

  const [idTransport, setIdTransport] = useState('');
  const dataIdTransport = [idTransport, setIdTransport];
  const [idDevice, setIdDevice] = useState('');
  const dataIdDevice = [idDevice, setIdDevice];

  const [dataChange, setDataChange] = useState(1);
  const checkData = [dataChange, setDataChange];

  const [pageData, setPageData] = useState(1);
  const pagination = [pageData, setPageData];

  const [isLoading, setIsLoading] = useState(false);
  const loadingFooter = [isLoading, setIsLoading];

  const [isEmployee, setIsEmployee] = useState(false);
  const checkAcount = [isEmployee, setIsEmployee];

  const [deleteEmployee, setDeleteEmployee] = useState(false);
  const deleteEmployees = [deleteEmployee, setDeleteEmployee];
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
        deleteEmployees,
        dataIdContract,
        dataIdTransport,
        dataIdDevice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
