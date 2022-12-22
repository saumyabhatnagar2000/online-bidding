import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from "./context/DataContext";
import { BrowserRouter as Router, Route ,Link, Routes, Navigate} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import NavBar from "./components/NavBar";


function App() {
  return (
    <div className="App">
      <Router>
      <div className="list">
        <NavBar/>
        </div>
        <Routes>
          <Route exact path="/" element={<div className='container'>
        <div className='py-4'>
        <h3>Home Page</h3>
        <p className='lead'>
        Hi, This is simple website to add users and see list of users after you are signed in.
        <br/>
        <br/>
        After going to list page you can see the detail of a particular user. Take actions like edit, or can delete
        the user from the list.
        <br/>
        <br/>
        But before that you have to create an account, and if account is already there you need to sign in.
        </p>
        </div>
    </div>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
