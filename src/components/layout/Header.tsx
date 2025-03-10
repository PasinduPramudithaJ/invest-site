import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import logo from "../assets/logo1.png";
import { logout } from "../../services/AuthService";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [paths, setPath] = useState<string | null>(null);
  const [enterpriseId, setEnterpriseId] = useState<string | null>(null);
  const [investmentId, setInvestmentId] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const storedToken = sessionStorage.getItem("token");
      const fName = sessionStorage.getItem("firstName");
      const path = sessionStorage.getItem("path");
      const id = sessionStorage.getItem("mokakHariId");
      console.log(id);
      
      if (path === "entp") {
        setPath("entp");
      }
      if (path === "int") {
        setPath("int");
      }
      setEnterpriseId(id);
      setInvestmentId(id);
      setToken(storedToken);
      setFirstName(fName);
    };
    fetchData();
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <NavLink to="/home">
            <img src={logo} alt="Company Logo" />
          </NavLink>
        </div>
        <div className="left-links">
      
          {paths === "entp" ? (
            <div><NavLink className="nav-link" to="/investors">Investors</NavLink></div>
          ):(
            <NavLink className="nav-link" to="/about-us">About Us</NavLink>
          )}
          {paths === "int" ? (
            <div><NavLink className="nav-link" to="/enterprise">Entrepreneur</NavLink></div>
          ):(
            ""
          )}
          
        </div>

        <div className="right-links">
          {token ? (
            <div><NavLink className="nav-link" to="/funding">Fund Request</NavLink></div>
          ):("")}
          {token ? (
            <div>
          <NavLink className="nav-link" to="/fundList">Fund List</NavLink></div>
          ):("")}

          {token ? (
            <button className="nav-link" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <NavLink className="nav-link" to="/login">Sign In</NavLink>
              <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
            </>
          )}

          
          {paths === "entp" ? (
            <div className="text-white d-flex"><a href={`/updateEnterprise/${enterpriseId}`}>{firstName}</a></div>
          ):(
            ""
          )}
          {paths === "int" ? (
            <div className="text-white d-flex"><a href={`/updateInvester/${investmentId}`}>{firstName}</a></div>
          ):(
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;