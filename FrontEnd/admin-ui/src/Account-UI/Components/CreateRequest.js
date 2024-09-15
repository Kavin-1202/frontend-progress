import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateRequest = () => {
  const managername = localStorage.getItem('username');
  const navigate = useNavigate();

  // Initialize state for form data
  const [formData, setFormData] = useState({
    accountid: '',
    managername: '', // Fixed spelling from 'mangername' to 'managername'
    coursename: '',
    description: '',
    concepts: '',
    duration: '',
    employeeposition: '',
    status: 'PENDING', // Default status
    requiredemployees: 0,
  });

  // Fetch user details based on username from localStorage when the component mounts
  useEffect(() => {
    if (managername) {
      // Make an axios GET request to fetch user details
      axios.get(`http://localhost:9002/users/byName/${managername}`)
        .then(response => {
          const { accountid, username } = response.data;
          setFormData(prevFormData => ({
            ...prevFormData,
            accountid,
            managername: username,
          }));
        })
        .catch(error => {
          console.error('Failed to fetch user details:', error.response ? error.response.data : error.message);
          alert('Failed to fetch user details. Please try again.');
        });
    } else {
      alert('Manager name not found in local storage.');
    }
  }, [managername]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.coursename) {
      console.error('Course Name is required.');
      alert('Course Name is required.');
      return;
    }

    // Post the training request to the backend
    axios.post(`http://localhost:9000/accounts/sendRequest/${managername}`, formData)
      .then(() => {
        navigate(-1); // Redirect to the home page on successful submission
      })
      .catch(error => {
        console.error('Failed to save request:', error.response ? error.response.data : error.message);
        alert('Failed to save request. Please try again.');
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Request</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="accountid"
          value={formData.accountid}
          onChange={handleChange}
          placeholder="Account ID"
          className="p-2 border rounded w-full"
          required
          readOnly
        />
        <input
          type="text"
          name="managername"
          value={formData.managername}
          onChange={handleChange}
          placeholder="Manager Name"
          className="p-2 border rounded w-full"
          required
          readOnly
        />
        <input
          type="text"
          name="coursename"
          value={formData.coursename}
          onChange={handleChange}
          placeholder="Course Name"
          className="p-2 border rounded w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded w-full"
          required
        />
        <textarea
          name="concepts"
          value={formData.concepts}
          onChange={handleChange}
          placeholder="Concepts"
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="employeeposition"
          value={formData.employeeposition}
          onChange={handleChange}
          placeholder="Employee Position"
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="number"
          name="requiredemployees"
          value={formData.requiredemployees}
          onChange={handleChange}
          placeholder="Required Employees"
          className="p-2 border rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default CreateRequest;
