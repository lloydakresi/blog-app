import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../sessionSlice';

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
        await dispatch(signup(formData)).unwrap(); //
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={!canSave}>
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
