import "./App.css";
import Home from "./components/Home";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <>
      <div className="App">
        <DataProvider>
          <Home />
        </DataProvider>
      </div>
    </>
  );
}

export default App;
