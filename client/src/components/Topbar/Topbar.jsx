import React, { useState, useContext } from "react";
import { FaSun, FaMoon, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Topbar.css";
import { ThemeContext } from "../../context/ThemeContext";
import { Context } from "../../context/Context";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className="topbar">
      <h1 className="logo">Ed Learn</h1>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/developer">
          Developer
        </Link>
        <Link className="link" to="/courses">
          Courses
        </Link>
        <Link className="link" to="/blog">
          Blog
        </Link>
        <Link className="link" to="/about">
          About
        </Link>
        <Link className="link" to="/contact">
          Contact
        </Link>
      </nav>

      {user ? (
        <div className="user-container">
          <button
            className="user-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle className="user-icon" />
            <span>{user.username}</span>
          </button>

          <Link to="/practice" className="practice-btnn link">
            Practice
          </Link>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item with-submenu"
                onMouseEnter={() => setSubmenuOpen(true)}
                onMouseLeave={() => setSubmenuOpen(false)}
              >
                <span>Dashboard</span>
                {/* {submenuOpen && (
                  <div className="submenu">
                    <Link to="/dashboard/profile">Profile</Link>
                    <Link to="/dashboard/courses">Token</Link>
                    <Link to="/dashboard/settings">Certification</Link>
                  </div>
                )} */}
              </div>
              <Link className="dropdown-item" to="/settings">
                Settings
              </Link>
              <div className="dropdown-item logout-btn" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="login-btn link">
            Login
          </Link>
          <Link to="/register" className="register-btn link">
            Register
          </Link>
        </div>
      )}

      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
}
