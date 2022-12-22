import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/loginservice";
import { useData } from "../../hooks/useData";

const Login = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { token, setToken } = useData();

  const { email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await loginUser(user.email, user.password);
      setToken(apiResponse?.data?.token ?? "");
      navigate("/home");
    } catch (e) {}
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <br />
          <button className="btn btn-warning btn-block">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
