import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseAssignment = ({ courseid, onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [course, setCourse] = useState({});
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const baseUrl = 'http://localhost:9001/admin'

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:9001/admin/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching employees.');
        setLoading(false);
        console.error(error);
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/admin/courses/${courseid}`);
        setCourse(response.data);
      } catch (error) {
        setError('Error fetching course details.');
        console.error(error);
      }
    };

    fetchEmployees();
    fetchCourse();
  }, [courseid]);

  const handleAssign = async () => {
   
    try {
      console.log(courseid,"",employees.filter(emp => emp.selected).map(emp => emp.username),'',deadline);
      await axios.post(baseUrl+'/assign', {
        courseid,
        employeeUsernames: employees.filter(emp => emp.selected).map(emp => emp.username),
        deadline,
      });
      toast.success('Course assigned successfully');
    } catch (error) {
      toast.error('Error assigning course');
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Assign Course to Employees</h2>
      <button
        onClick={onClose}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        Close
      </button>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Course Details</h3>
        <p><strong>Course Name:</strong> {course.coursename}</p>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Concepts:</strong> {course.concepts}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="deadline">Deadline</label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <button
        onClick={handleAssign}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Assign Course
      </button>
      <div className="space-y-4 mt-4">
        {employees.map((employee, index) => (
          <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <span>{employee.username} ({employee.email})</span>
            <input
              type="checkbox"
              checked={employee.selected || false}
              onChange={() => {
                const updatedEmployees = [...employees];
                updatedEmployees[index].selected = !updatedEmployees[index].selected;
                setEmployees(updatedEmployees);
              }}
              className="form-checkbox"
            />
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
    
  );
};

export default CourseAssignment;
