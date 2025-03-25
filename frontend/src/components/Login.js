import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './Login.css';  

function Login() {   
  const navigate = useNavigate();   
  const [user, setUser] = useState({
    email: '',
    password: '',
  });   
  const [error, setError] = useState('');  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change   
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', user);             
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));                 
        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      console.error('Login error:', error);
    }
  };  

  return (
    <div className="login-page-container">       
      <div className="login-container">         
        <h2>Login to your account</h2>         
        {error && <div className="error-message">{error}</div>}                 
        <form onSubmit={handleSubmit}>           
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Email*"
            required
            value={user.email}
            onChange={handleChange}
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password*"
            required
            value={user.password}
            onChange={handleChange}
          />
          <button className="login-button" type="submit">
            LOGIN
          </button>
        </form>         
        <div className="login-links">           
          <p>
            Forgot your password?{' '}
            <button className="text-button" onClick={() => navigate('/forgot-password')}>
              Reset here
            </button>
          </p>
          <p>
            Don't have an account?{' '}
            <button className="text-button" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </p>
        </div>       
      </div>     
    </div>   
  ); 
}  

export default Login;
