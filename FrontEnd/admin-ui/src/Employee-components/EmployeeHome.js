// EmployeeHome.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../courseSlice'; // Use the new course slice
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import EmployeeNavbar from './EmployeeNavbar';

const EmployeeHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading, error } = useSelector((state) => state.course); // Access course state
  const storedUsername = localStorage.getItem('username');

  useEffect(() => {
    dispatch(fetchCourses(storedUsername));
  }, [dispatch]);

  const totalAssigned = courses.length;
  const totalStarted = courses.filter((course) => course.status === 'Started').length;
  const totalCompleted = courses.filter((course) => course.status === 'Completed').length;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <EmployeeNavbar />
      {/* <h1 className="text-3xl font-bold mb-6 text-center">Employee Dashboard</h1> */}
      {/* Statistics Cards */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-indigo-500 text-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="text-2xl font-bold">{totalAssigned}</p>
              <p className="text-sm">Total Courses Assigned</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="text-2xl font-bold">{totalStarted}</p>
              <p className="text-sm">Total Courses Ongoing</p>
            </div>
            <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="text-2xl font-bold">{totalCompleted}</p>
              <p className="text-sm">Total Courses Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Learning Card */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md flex justify-center items-center cursor-pointer" onClick={() => navigate('/my-courses')}>
            <p className="text-2xl font-bold">My Learning</p>
          </div>
        </div>
      </div>

      {/* My Progress Card */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex justify-center items-center cursor-pointer" onClick={() => navigate('/progress')}>
            <p className="text-2xl font-bold">My Progress</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EmployeeHome;
