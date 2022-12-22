import React from "react";
import { useData } from "../hooks/useData";

const Home = () => {
  const { data, setData } = useData();

  console.log(data);
  return (
    <div className="App">
      <h1>Home page for auction website</h1>
    </div>
  );
};

export default Home;
