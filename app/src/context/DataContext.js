import {createContext, useState} from 'react';

const DataContext = createContext({});

const DataProvider = ({children}) => {
  const [authData, setAuthData] = useState();

  return (
    <DataContext.Provider value={{authData, setAuthData}}>
      {children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
