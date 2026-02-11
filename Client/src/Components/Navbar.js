import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { toast } from 'react-toastify';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          Student Portal
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/personal-details" className="navbar-link">
              Personal Details
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/academic-details" className="navbar-link">
              Academic Details
            </Link>
          </li>
          <li className="navbar-item user-info">
            <span className="user-name">{user?.name || 'Student'}</span>
          </li>
          <li className="navbar-item">
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
