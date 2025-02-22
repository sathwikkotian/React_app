import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; 

function Login() {
  const navigate = useNavigate(); // Define navigate

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h2>Login to your account</h2>
        <input className="login-input" type="text" placeholder="Email or Mobile Number*" required/>
        <input className="login-input" type="password" placeholder="Password*" required/>
        <button className="login-button">LOGIN</button>
        
        <p>Forgot your password? <a href="https://www.myntra.com/forgot" className="red-link">Reset here</a></p>
        <p>Have trouble logging in? <a href="https://www.myntra.com/contactus" className="red-link">Get Help</a></p>

        <p>Don't have an account?</p>
        <button className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
