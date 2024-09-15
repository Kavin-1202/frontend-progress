import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [accountid, setAccountId] = useState('');
  const [accountname, setAccountName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  const checkUsernameUnique = async (name) => {
    try {
      const response = await axios.get(`http://localhost:9002/users/byName/${name}`);
      // Assuming response.data contains user details if username exists
      console.log(response.data);
      return response.data ? false : true; // If response contains user details, username is taken
    } catch (error) {
      toast.error('Error checking username uniqueness');
      return false; // Consider username taken if there's an error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters long, contain uppercase, lowercase, digits, and special characters');
      return;
    }

    if (!/^\d+$/.test(accountid)) {
      toast.error('Account ID must contain only numbers');
      return;
    }

    const isUsernameUnique = await checkUsernameUnique(username);
    if (!isUsernameUnique) {
      toast.error('Username or email is already taken');
      return;
    }

    try {
      await axios.post('http://localhost:9002/users', {
        accountid,
        accountname,
        username,
        email,
        password,
        role: 'MANAGER',
      });

      toast.success('Manager registered successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast.error('Error registering Manager');
    }
  };

  const handleReset = () => {
    setAccountId('');
    setAccountName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
        <h2 className="text-lg font-semibold text-center mb-4">Signup</h2>
        <div className="mb-2">
          <label className="block text-sm mb-1">Account ID:</label>
          <input
            type="text"
            value={accountid}
            onChange={(e) => setAccountId(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm mb-1">Account Name:</label>
          <input
            type="text"
            value={accountname}
            onChange={(e) => setAccountName(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
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
          <label className="block text-sm mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm mb-1">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm mb-1">Confirm Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={toggleShowPassword}
            className="mr-2"
          />
          <label htmlFor="showPassword" className="text-sm">Show Password</label>
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Role:</label>
          <input
            type="text"
            value="MANAGER"
            readOnly
            className="border rounded w-full p-2 bg-gray-100"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
