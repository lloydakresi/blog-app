// Profile.js

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../sessionSlice';
import { useDispatch } from 'react-redux';
import './Profile.css'; // Import the generated CSS file

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    // Add logic to handle login
    try {
      await dispatch(logout()).unwrap();
      // Reset the form after submission
      // Navigate to the home page and replace the current history entry
      alert('You have been logged out');
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Failed to logout');
    }
  };

  return (
    <div className="profile-container">
      <NavLink to="/blogs" className="profile-link">
        Your Blogs
      </NavLink>
      <NavLink to="/blogs/new" className="profile-link">
        Create New Blog
      </NavLink>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}
