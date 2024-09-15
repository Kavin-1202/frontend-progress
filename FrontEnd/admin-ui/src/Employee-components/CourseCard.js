// import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ username, course}) => {
  // const [courseStatus, setCourseStatus] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Fetch the status of the course for the specific employee
  //   const fetchCourseStatus = async () => {
  //     try {
  //       const storedUsername = localStorage.getItem('username')
  //       const response = await axios.get(
  //         `http://localhost:9001/admin/assign/status/${course.coursename}`
  //       );
  //       // // Assuming response.data is an array of statuses for each employee
  //       // const [status] = response.data.filter((item) => item.username === storedUsername);
  //       // setCourseStatus(status.courseStatus);
  //     } catch (err) {
  //       console.error('Error fetching course status', err);
  //     }
  //   };
  //   fetchCourseStatus();
  // }, []);

  const handleStartCourse = async () => {
    try {
      const storedUsername = localStorage.getItem('username') || username; // Use the provided username or fetch from local storage
      await axios.put(
        `http://localhost:9001/admin/employees/start/${course.id}/${storedUsername}`
      );
      // After successfully starting the course, fetch the updated status
      // setCourseStatus('STARTED');
      navigate(`/courses/${course.coursename}`);
    } catch (err) {
      console.error('Error starting the course', err);
    }
  };

  return (
    <div className="flex-shrink-0 w-64 bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">{course.coursename}</h3>
      <p className="text-sm text-gray-600 mb-2">{course.description}</p>
      <button
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
        onClick={handleStartCourse}
      >
        START
      </button>
    </div>
  );
};

export default CourseCard;
