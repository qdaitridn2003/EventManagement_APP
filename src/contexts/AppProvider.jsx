import React, { createContext } from 'react';

const AppContext = createContext({});

const AppProvider = props => {
  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
