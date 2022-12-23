import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from "./context/DataContext";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import NavBar from "./components/NavBar";
import Seller from "./components/users/Seller";
import Items from "./components/users/Items";
import Auction from "./components/Auctions";
import Bidding from "./components/BidPage";
import AddItem from "./components/AddItem";
import { Profile } from "./components/Profile";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <div className="list">
            <NavBar />
          </div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div className="container">
                  <div className="py-4">
                    <Home />
                  </div>
                </div>
              }
            />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/seller/details" element={<Seller />} />
            <Route exact path="/items" element={<Items />} />
            <Route exact path="/auctions" element={<Auction />} />
            <Route exact path="/auctions/:id" element={<Bidding />} />
            <Route exact path="/additem" element={<AddItem />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
