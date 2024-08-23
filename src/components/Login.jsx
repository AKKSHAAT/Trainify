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
    let user = await axios.post(`${backendUrl}/api/user/login`, formData)
      .then(user =>{
        localStorage.setItem('userId', user.data.userId);
        localStorage.setItem('token', user.data.token);
        navigate('/');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="on"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="on"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
        <Link to="/register" className=' text-blue-600'>wanna register?</Link>
      </form>
    </div>
  );
};
