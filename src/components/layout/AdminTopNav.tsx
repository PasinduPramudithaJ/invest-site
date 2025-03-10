import React from "react";
import logo from "../assets/logo1.png";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/AuthService";
const AdminTopNav: React.FC = () => {
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <a className="navbar-brand ps-3 d-flex align-items-center" href="index.html">
    <div className="logo">
          <NavLink to="/home">
            <img src={logo} alt="Company Logo" />
          </NavLink>
        </div>
      Seed Link
    </a>
    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
                User Name: {sessionStorage.getItem("firstName")}
              </a>
            </li>
            <li>
            <a className="dropdown-item" href="#!">
                User Role: {sessionStorage.getItem("role")}
              </a>
            
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
            <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
export default AdminTopNav;
