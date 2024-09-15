// CourseDetailsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RequestDetails = () => {
  const { requestid } = useParams(); // Retrieve the requestid from the route parameters
  const [requestDetails, setRequestDetails] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:9001/admin';

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/courses/dashboard/view/${requestid}`);
        setRequestDetails(response.data);
      } catch (error) {
        setError('Error fetching course details');
        console.error(error);
      }
    };

    fetchCourseDetails();
  }, [requestid]);

  return (
    <div className="p-8 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back
      </button>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        requestDetails && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{requestDetails.coursename}</h1>
            <p><strong>Manager Name:</strong> {requestDetails.managername}</p>
          <p><strong>Course Name:</strong> {requestDetails.coursename}</p>
          <p><strong>Description:</strong> {requestDetails.description}</p>
          <p><strong>Concepts:</strong> {requestDetails.concepts}</p>
          <p><strong>Duration:</strong> {requestDetails.duration}</p>
          <p><strong>Employee Position:</strong> {requestDetails.employeeposition}</p>
          <p><strong>Status:</strong> {requestDetails.status}</p>
          {/* <p><strong>Created Date:</strong> {new Date(requestDetails.createddate).toLocaleDateString()}</p> */}
          <p><strong>Required Employees:</strong> {requestDetails.requiredemployees}</p>
          </div>
        )
      )}
    </div>
  );
};

export default RequestDetails;
