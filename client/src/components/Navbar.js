import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SRS<span> // Student Record System</span>
      </Link>
      <div className="navbar-links">
        <Link to="/add" className="nav-btn">
          + Add Student
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
