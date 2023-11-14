import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = props => {
  const { children } = props;
  const [isLogin, setisLogin] = useState(false);
  const [data, setisData] = useState([]);

  return <AppContext.Provider value={{ isLogin, setisLogin, data, setisData }}>{children}</AppContext.Provider>;
};


