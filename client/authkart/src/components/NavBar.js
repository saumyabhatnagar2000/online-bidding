import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user } = localStorage || {};
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("role");
  };
  const [token, setToken] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    (async () => {
      const token = await localStorage.getItem("token");
      const role = await localStorage.getItem("role");
      setToken(token);
      setRole(role);
    })();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Auction Kart
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>
        {!token ? (
          <Link className="btn btn-outline-light  w-20" to="/login">
            Sign In
          </Link>
        ) : null}
        {!token ? (
          <Link className="btn btn-outline-light ms-1 w-20" to="/register">
            Create Account
          </Link>
        ) : null}

        {token && (role == "admin" || role == "seller") ? (
          <Link className="btn btn-outline-light  w-21" to="/additem">
            Add Item
          </Link>
        ) : <Link className="btn btn-outline-light  w-21" to="/additem">
        Add Item
      </Link>}
        {token ? (
          <Link
            className="btn btn-outline-light ms-1 w-21"
            to="/login"
            onClick={handleSignOut}
          >
            Sign Out
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
