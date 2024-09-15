// ProgressComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import { progressData } from './progressData'; // Import the dummy progress data

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
const ProgressComponent = () => {
  const navigate = useNavigate();
  // Prepare data for the Bar chart (individual course progress)
  const barChartData = {
    labels: progressData.map((data) => data.courseName),
    datasets: [
      {
        label: 'Progress (%)',
        data: progressData.map((data) => data.progress),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the Pie chart (overall course completion)
  const totalProgress = progressData.reduce((acc, course) => acc + course.progress, 0);
  const totalCourses = progressData.length * 100;
  const pieChartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [totalProgress, totalCourses - totalProgress],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/employee-dashboard')}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-auto"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">Course Progress</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart for individual course progress */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">Course Progress (Bar Chart)</h2>
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

        {/* Pie Chart for overall course completion */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-center">Overall Progress (Pie Chart)</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default ProgressComponent;
