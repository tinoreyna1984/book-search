import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles.css";
import { Spinner } from "./Spinner";

export const Navbar = () => {

  // corrige botón de colapsamiento de navegación
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const auth = useAuth0();
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = auth;

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) return <Spinner />;

  /**
   * Actualmente, están habiendo problemas con el botón de colapsar del navbar (Bootstrap 5.2)
   * Se emplea hooks para corregir dinámicamente el botón de colapsar del navbar
   * TODO: agregar suavización al botón de colapsar del navbar
   */

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={require("../assets/logo.png")}
            alt="Logo"
            width="100%"
            height="auto"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarMenu">
          <div className="navbar-nav">
            {isAuthenticated ? (
              <>
                <NavLink className="nav-link link-light" to="/search">
                  Search
                </NavLink>
                <NavLink className="nav-link link-light" to="/profile">
                  {user.given_name}
                </NavLink>
                <button className="btn btn-dark" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-dark" onClick={handleLogin}>
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
