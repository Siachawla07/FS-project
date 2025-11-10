import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import axios from 'axios';

function Login() {
  //const [username, setUsername] = useState('');
  const [email,setEmail]=useState("");
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
     console.log("Submitting login form..."); 
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
      console.log("Login successful", res.data);
      navigate('/home');
    } catch (error) {
      console.error("Login Error:", error.response?.data.message || error.message);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username</label><br />
        <input
          className='user'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <label>Password</label><br />
        <input
          className='user'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <div className='button-group'>
          <button type='button' className='login'>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      

      <br /><br />
      <button className='login' onClick={() => navigate('/signup')}>Sign Up</button>
      </form>
    </div>
  );
}

export default Login;
