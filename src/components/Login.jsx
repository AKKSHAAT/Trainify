import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Login = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, formData);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);
      navigate('/temp'); // Navigate to a temporary route
      navigate('/');    
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className='mx-auto text-center p-6 text-8xl font-bold text-white text-wrap'>
          Welcome to Trainify!
      </div>
      <h1 className='mx-auto text-center  text-4xl font-semibold text-white mb-4'> 
        Please login to access your training program 
      </h1>

      <div className="max-w-md mx-auto mt-10 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block ">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="on"
              className="w-full px-3 py-2 border rounded bg-gray-800 text-white" // Added dark background and white text
              required
            />
          </div>
          <div className="mb-4">
            <label className="block ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="on"
              className="w-full px-3 py-2 border rounded bg-gray-800 text-white" // Added dark background and white text
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
          <div className='my-3'>
            <Link to="/register" className=' text-blue-600 text-lg'>wanna register🤔 ?</Link>
          </div>
        </form>
      </div>
    </>
  );
};
