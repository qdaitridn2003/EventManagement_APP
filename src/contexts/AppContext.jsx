import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = props => {
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [data, setIsData] = useState([]);

  return (
    <AppContext.Provider value={{ isLogin, setIsLogin, data, setIsData }}>
      {children}
    </AppContext.Provider>
  );
};
