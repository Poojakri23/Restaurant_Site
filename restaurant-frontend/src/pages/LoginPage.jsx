import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      console.log(res)
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        console.log(`Login Token ${localStorage.getItem('token')}`);
        localStorage.setItem('role', data.role);
        console.log(`Login Role ${localStorage.getItem('role')}`);
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (err) {
      alert('Server error');
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" required onChange=
          {handleChange} />
        <input type="password" name="password" placeholder="Password" required
          onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginPage;