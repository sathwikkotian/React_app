import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaShoppingCart, FaTools } from "react-icons/fa";
import SearchBar from "./Searchbar";
import logo from "../assets/myntra.jpeg";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    setIsLoggedIn(!!token);
    setCartCount(cartItems.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Logo" className="navbar-img" />
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Menu Icon for Mobile */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/men" className="nav-links" onClick={() => setMenuOpen(false)}>
              Men
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/women" className="nav-links" onClick={() => setMenuOpen(false)}>
              Women
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/kids" className="nav-links" onClick={() => setMenuOpen(false)}>
              Kids
            </Link>
          </li>

          {/* Products Section */}
          <li className="nav-item">
            <Link to="/products" className="nav-links" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
          </li>

          {/* Admin Panel Section (Visible to Everyone) */}
          <li className="nav-item">
            <Link to="/admin" className="nav-links" onClick={() => setMenuOpen(false)}>
              <FaTools /> Admin Panel
            </Link>
          </li>

          {/* Cart Section */}
          <li className="nav-item cart-icon">
            <Link to="/cart" className="nav-links" onClick={() => setMenuOpen(false)}>
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </li>

          {/* Profile & Authentication */}
          {isLoggedIn ? (
            <li className="nav-item profile-menu">
              <div className="profile-icon" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <FaUser />
                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
                      Profile
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links login-link" onClick={() => setMenuOpen(false)}>
                Login/Signup
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
