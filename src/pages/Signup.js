import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css'; 



function Signup() {
  const navigate = useNavigate(); 

  return (
    <div className="signup-page-container">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <input className="signup-input" type="text" placeholder="Full Name*" required />
        <input className="signup-input" type="email" placeholder="Email*" required />
        <input className="signup-input" type="password" placeholder="Password*" required />
        <button className="signup-button">Sign Up</button>

        <p>Already have an account?</p>
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}

export default Signup;

