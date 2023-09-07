import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {

  return (
    <div className="container-fluid">




      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand h1 mb-0" href="/"> Playware </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="btn btn-outline-success mx-3" aria-current="page" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-outline-success mx-3" to="/Game">  Games  </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-success mx-3" to="/Login">  Login  </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-secondary mx-3" to="/Admin"> Admin_Options </Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>








    </div>

  );
};

export default NavBar;