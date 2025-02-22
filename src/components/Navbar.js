import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from './Searchbar';
import logo from '../assets/myntra.jpeg';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        <img src={logo} alt="Logo" className="navbar-img" />
        </Link>

        <SearchBar /> {/* 🔍 Search Bar in Navbar */}

        {/* Hamburger Icon for Mobile */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item"><Link to="/" className="nav-links">Home</Link></li>
          <li className="nav-item"><Link to="/services" className="nav-links">Services</Link></li>
          <li className="nav-item"><Link to="/products" className="nav-links">Products</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-links">Contact</Link></li>
          <li className="nav-item"><Link to="/login" className="nav-links">Login/Signup</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
