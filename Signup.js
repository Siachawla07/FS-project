import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/signup.css';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const[Error,setError]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/signup', {
        username,
        email,
        password
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("Signup successfull", res.data);
      alert("Signup successfull. Please log in.");
      navigate('/'); // redirect to login
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Signup failed";
      setError(errorMsg); // Show specific error
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="container-signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>Username</label><br />
        <input type="text" className='user' value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
        <label>Email</label><br />
        <input type="email" className='user' value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <label>Password</label><br />
        <input type="password" className='user' value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button className='button' type='submit'>Sign Up</button>
        <br /><br />
        <button className='button' type="button" onClick={() => navigate('/')}>Back to Login</button>
      </form>
    </div>
  );
}

export default Signup;
