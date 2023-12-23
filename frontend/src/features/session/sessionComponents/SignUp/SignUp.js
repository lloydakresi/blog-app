// SignupForm.js

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../sessionSlice';
import './SignUp.css'; // Import the generated CSS file

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const canSave = Boolean(formData.email) && Boolean(formData.password) && Boolean(formData.username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await dispatch(signup(formData)).unwrap();
        // Reset the form after submission if needed
        setFormData({
          email: '',
          password: '',
          username: '',
        });
        navigate('/blogs');
      } catch (err) {
        console.error('Failed to sign up');
      }
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email" id="email-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="username" id="username-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" id="password-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={!canSave} className="signup-button" id="signup-button">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
