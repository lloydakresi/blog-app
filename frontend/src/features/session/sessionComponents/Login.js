import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../sessionSlice';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    credential: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const canSave = Boolean(formData.credential) && Boolean(formData.password);

  const handleSubmit = async (e) => {
    if (canSave) {
      e.preventDefault();
      // Add logic to handle login
      try {
        await dispatch(login(formData)).unwrap();
        // Reset the form after submission
        setFormData({
          credential: '',
          password: '',
        });
        // Navigate to the home page and replace the current history entry
        navigate('/blogs', { replace: true });
      } catch (err) {
        console.error('Failed to login');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="credentials">Username or Email:</label>
          <input
            type="text"
            id="credential"
            name="credential"
            value={formData.credential}
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
          Log In
        </button>
      </form>
      <div>
        First time here? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default LoginForm;
