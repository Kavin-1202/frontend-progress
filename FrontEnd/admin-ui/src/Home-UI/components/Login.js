// src/components/LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9002/users/login', {
        username,
        password
      });

      const { username: fetchedUsername,password: fetchedPassword, role } = response.data;

      // Store in local storage
      localStorage.setItem('username', fetchedUsername);
      localStorage.setItem('password',fetchedPassword);
      localStorage.setItem('role', role);

      toast.success('Login successful!');

      if(localStorage.getItem('role')==='MANAGER')
      navigate('/manager-dashboard'); // Navigate to a dashboard or home page

      else if(localStorage.getItem('role')==='EMPLOYEE')
      navigate('/employee-dashboard')
      else if(localStorage.getItem('role')=='ADMIN')
      navigate('/admin-dashboard')
    } catch (error) {
      toast.error('Invalid username or password');
    }
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm">
        <button
          onClick={handleBack}
          className="text-blue-500 hover:underline mb-4 flex items-center"
        >
          &lt; Back
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md w-full max-w-sm">
        <h2 className="text-lg font-semibold text-center mb-4">Login</h2>
        <div className="mb-2">
          <label className="block text-sm mb-1">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
