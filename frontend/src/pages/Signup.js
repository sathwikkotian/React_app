import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; // Import axios
import './Signup.css'; 

function Signup() {
  const navigate = useNavigate(); 
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", user);
      alert(response.data.message); // Show success message
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input className="signup-input" type="text" name="name" placeholder="Full Name*" required onChange={handleChange} />
          <input className="signup-input" type="email" name="email" placeholder="Email*" required onChange={handleChange} />
          <input className="signup-input" type="password" name="password" placeholder="Password*" required onChange={handleChange} />
          <button className="signup-button" type="submit">Sign Up</button>
        </form>
        <p>Already have an account?</p>
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}

export default Signup;
