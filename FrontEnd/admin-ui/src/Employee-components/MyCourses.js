// MyCourses.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../courseSlice'; // Use the new course slice
import CourseCard from './CourseCard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import EmployeeNavbar from './EmployeeNavbar';

const MyCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading, error } = useSelector((state) => state.course); // Access course state
  const storedUsername = localStorage.getItem('username');

  useEffect(() => {
    dispatch(fetchCourses(storedUsername));
  }, [dispatch]);

  const handleCourseClick = (coursename) => {
    navigate(`/courses/${coursename}`); // Navigate to the course details page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <EmployeeNavbar />
      <button
        onClick={() => navigate('/employee-dashboard')}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-auto"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">My Courses</h1>

      {/* Scrollable Courses List */}
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.courseid}
              course={course}
              onStart={() => handleCourseClick(course.coursename)} // Navigate on course click
            />
          ))
        ) : (
          <p>No courses assigned.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
