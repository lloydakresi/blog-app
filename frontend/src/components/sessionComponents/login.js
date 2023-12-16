import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/session/sessionSlice';
import { useNavigate } from 'react-router-dom'


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
    if (canSave){
        e.preventDefault();
        // Add your logic to handle login, e.g., send data to the server
        try {
            await dispatch(login(formData)).unwrap()
            // Reset the form after submission if needed
            setFormData({
                credential: '',
                password: '',
              });
            navigate('/');
        }catch(err){
            console.error('Failed to login');
        }
    }
  };

  return (
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

      <button type="submit" disabled={!canSave}>Log In</button>
    </form>
  );
};

export default LoginForm;
