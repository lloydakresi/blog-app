import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../sessionSlice';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    credential: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const canSave = Boolean(formData.credential) && Boolean(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      setLoading(true);
      setError('');

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
        console.error('Failed to login', err);
        setError('Invalid credentials. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group" id='credential'>
          <label htmlFor="credential">Username or Email:</label>
          <input
            type="text"
            id="credential"
            name="credential"
            value={formData.credential}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group" id="password">
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

        <button type="submit" disabled={!canSave || loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>

        {error && <div className="error-message">{error}</div>}
      </form>

      <div className="signup-link">
        First time here? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
