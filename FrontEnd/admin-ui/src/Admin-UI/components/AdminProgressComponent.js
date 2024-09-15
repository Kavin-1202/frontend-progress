// AdminProgressComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { adminProgressData } from './adminProgressData'; // Import the dummy admin data
import { useNavigate } from 'react-router';

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminProgressComponent = () => {
  const navigate = useNavigate();
  // Extract unique course names and employee names from the data
  const courses = [...new Set(adminProgressData.map((data) => data.courseName))];
  const employees = [...new Set(adminProgressData.map((data) => data.employeeName))];

  // Prepare data for the Bar chart (progress by course and employee)
  const barChartData = {
    labels: courses, // X-axis will be the course names
    datasets: employees.map((employee, index) => ({
      label: employee, // Each employee will have their own bar
      data: courses.map((course) => {
        const progress = adminProgressData.find(
          (data) => data.employeeName === employee && data.courseName === course
        );
        return progress ? progress.progress : 0; // If progress data is missing for a course, use 0
      }),
      backgroundColor: `rgba(${index * 50}, ${100 + index * 30}, ${index * 20}, 0.6)`,
      borderColor: `rgba(${index * 50}, ${100 + index * 30}, ${index * 20}, 1)`,
      borderWidth: 1,
    })),
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Employees' Progress</h1>
      <button
          onClick={() => navigate('/admin-dashboard')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back
        </button>
      {/* Bar Chart for aggregate course progress by employee */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Aggregate Progress (Bar Chart)</h2>
        <Bar
          data={barChartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          }}
        />
      </div>

      {/* Table for detailed employee progress */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Detailed Employee Progress</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Employee Name</th>
              <th className="py-2">Course Name</th>
              <th className="py-2">Progress (%)</th>
            </tr>
          </thead>
          <tbody>
            {adminProgressData.map((data, index) => (
              <tr key={index} className="text-center border-b">
                <td className="py-2">{data.employeeName}</td>
                <td className="py-2">{data.courseName}</td>
                <td className="py-2">{data.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProgressComponent;
