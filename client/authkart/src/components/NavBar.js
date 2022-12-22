import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const {user} = localStorage || {};
  const navigate = useNavigate();

  const handleSignOut = () =>{
    delete localStorage.user
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Auction Kart</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {user ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
              </li>
            </ul>:null}
          </div>
          {!user ? <Link className='btn btn-outline-light w-25' to="/login" >Sign In</Link>: null}
          {!user ? <Link className='btn btn-outline-light w-25' to="/register" >Register</Link>: null}
          {user ? <Link className='btn btn-outline-light w-25' to="/login" onClick={handleSignOut}>Sign Out</Link>: null}
          {user ? <Link className='btn btn-outline-light w-25' to="/user/add">Add Users</Link>:null}
        </div>
      </nav>
  );
};

export default NavBar;
