import React, { createContext, useState } from "react";

const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [data, setData] = useState("hello");
  const [token, setToken] = useState("");

  return (
    <DataContext.Provider value={{ data, setData, setToken, token }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
