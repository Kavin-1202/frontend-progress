// CreateCourseForm.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';



const CreateCourseForm = () => {

 const baseUrl =`http://localhost:9001/admin`
 const {requestid} = useParams()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    requestid: '',
    accountid: '',
    managername: '',
    coursename: '',
    description: '',
    concepts: '',
    outcomes: '',
    resourcelinks: '',
    otherlinks: ''
  });
  
  const [resourceLinks, setResourceLinks] = useState([]);


  
useEffect(() => {
    const fetchRequest = async () => {
        try {
          const response = await axios.get(`${baseUrl}/courses/dashboard/view/${requestid}`);
          setFormData({
            ...response.data,
            resourcelinks: '', // Clear these fields for user input
            otherlinks: '',
            outcomes: ''
          });
        } catch (error) {
          toast.error('Error fetching course editdetails');
          console.error(error);
        }
      }
    fetchRequest();
  
}, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidYouTubeURL = (url) => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/watch\?v=([^&]+)/m;
    return regex.test(url);
  };

  const handleAddLink = () => {
    if (!isValidYouTubeURL(formData.resourcelinks)) {
      toast.error('Enter a valid link');
      setFormData((prevData) => ({
        ...prevData,
        resourcelinks: '',
      }));
      return;
    }
    setResourceLinks((prevLinks) => [formData.resourcelinks, ...prevLinks]);
    setFormData((prevData) => ({ ...prevData, resourcelinks: '' }));
  };

  const handleRemoveLink = (index) => {
    setResourceLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:9001/admin/courses/create/${requestid}`, {
        ...formData,
        resourcelinks: resourceLinks.join(', '), // Convert array to comma-separated string
      });
      toast.success('Course created successfully!');
      setTimeout(() => navigate('/courses'), 4000); // Redirect after toast
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error creating course');
      console.error(error);
    }
  };

  const handleReset = () => {
    setFormData({
      requestid: '',
      accountid: '',
      managername: '',
      coursename: '',
      description: '',
      concepts: '',
      outcomes: '',
      resourcelinks: '',
      otherlinks: ''
    });
    setResourceLinks([]);
  };

  return (
    <div className="p-8 space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-gray-900">Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div>
          <label className="block text-gray-700">Request ID</label>
          <input
            type="text"
            name="requestid"
            value={formData.requestid}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700">Account ID</label>
          <input
            type="text"
            name="accountid"
            value={formData.accountid}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700">Manager Name</label>
          <input
            type="text"
            name="managername"
            value={formData.managername}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700">Course Name</label>
          <input
            type="text"
            name="coursename"
            value={formData.coursename}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700">Key Concepts</label>
          <input
            type="text"
            name="concepts"
            value={formData.concepts}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700">Resource Links</label>
          <input
            type="text"
            name="resourcelinks"
            value={formData.resourcelinks}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={handleAddLink}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600"
          >
            Add 
          </button>
          <ul className="mt-4">
            {resourceLinks.map((link, index) => (
              <li key={index} className="flex justify-between items-center">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {link}
                </a>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label className="block text-gray-700">Other Links</label>
          <input
            type="text"
            name="otherlinks"
            value={formData.otherlinks}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Outcomes</label>
          <input
            type="text"
            name="outcomes"
            value={formData.outcomes}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Course
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateCourseForm;



