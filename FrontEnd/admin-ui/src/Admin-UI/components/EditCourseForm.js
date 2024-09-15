// EditCourseForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBarComponent from './NavBarComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCourseForm = () => {
  const baseUrl = "http://localhost:9001/admin";  // Define the base URL here
  const { courseid } = useParams();  // Extract the course ID from the route parameters
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    coursename: '',
    description: '',
    duration: '',
    keyConcepts: '',
    otherLinks: '',  // Added state for other links
    outcomes: '',    // Added state for outcomes
    resourcelinks: '', // Added state for resource links
  });
  const [resourceLinks, setResourceLinks] = useState([]);
  const [otherLinks, setOtherLinks] = useState([]);
  const [, setOutcomes] = useState([]);

  useEffect(() => {
    // Fetch course data to edit
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/courses/${courseid}`);
        setCourse({
          ...response.data,
          resourcelinks: '',
          otherLinks: '',
          outcomes: '',
        });
        setResourceLinks(response.data.resourcelinks ? response.data.resourcelinks.split(', ') : []);
        setOtherLinks(response.data.otherLinks ? response.data.otherlinks.split(', ') : []);
        setOutcomes(response.data.outcomes ? response.data.outcomes.split(', ') : []);
        
      } catch (error) {
        toast.error('Error fetching course details.');
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseData();
  }, [courseid]);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddLink = () => {
    if (course.resourcelinks.trim() === '') return;
    setResourceLinks((prevLinks) => [...prevLinks, course.resourcelinks.trim()]);
    setCourse({ ...course, resourcelinks: '' });
  };

  const handleRemoveLink = (index) => {
    setResourceLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/courses/${courseid}`, {
        ...course,
        resourcelinks: resourceLinks.join(', '), // Convert array to comma-separated string
      });
      toast.success('Course updated successfully!');
     setTimeout(()=>navigate(-1),4000);  // Navigate back to the admin dashboard after successful update
    } catch (error) {
      toast.error('Error updating course.');
      console.error("Error updating course:", error);
    }
  };

  const handleReset = () => {
    setCourse({
      coursename: '',
      description: '',
      duration: '',
      concepts: '',
      otherLinks: '',
      outcomes: '',
      resourcelinks: '',
    });
    setResourceLinks([]);
  };

  return (
    <div className="p-6 space-y-6">
      <NavBarComponent/>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Back
      </button>
      
      {/* Page Title */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
      </div>

      {/* Edit Course Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="flex flex-col space-y-4">
          {/* Course Name */}
          <div>
            <label htmlFor="coursename" className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              name="coursename"
              id="coursename"
              value={course.coursename}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              disabled
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={course.description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={course.duration}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              
            />
          </div>

          {/* Key Concepts */}
          <div>
            <label htmlFor="keyConcepts" className="block text-sm font-medium text-gray-700">Key Concepts</label>
            <textarea
              name="keyConcepts"
              id="keyConcepts"
              value={course.concepts}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              
            ></textarea>
          </div>

          {/* Resource Links */}
          <div>
            <label htmlFor="resourcelinks" className="block text-sm font-medium text-gray-700">Resource Links</label>
            <input
              type="text"
              name="resourcelinks"
              id="resourcelinks"
              value={course.resourcelinks}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
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

          {/* Other Links */}
          <div>
            <label htmlFor="otherLinks" className="block text-sm font-medium text-gray-700">Other Links</label>
            <input
              type="text"
              name="otherLinks"
              id="otherLinks"
              value={course.otherLinks}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Outcomes */}
          <div>
            <label htmlFor="outcomes" className="block text-sm font-medium text-gray-700">Outcomes</label>
            <input
              type="text"
              name="outcomes"
              id="outcomes"
              value={course.outcomes}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update Course
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Toast Container for toasts */}
      <ToastContainer />
    </div>
  );
};

export default EditCourseForm;
