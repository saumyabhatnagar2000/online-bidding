import React, { createContext, useState } from "react";

const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [data, setData] = useState("hello");

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
