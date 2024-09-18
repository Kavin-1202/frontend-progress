import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewCourse = () => {
  const { courseid } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackError, setFeedbackError] = useState('');
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [employeeUsernames, setEmployeeUsernames] = useState({});
  const [ratingData, setRatingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:9001/admin/courses/${courseid}`);
        setCourse(response.data);
      } catch (error) {
        setError('Error fetching course details.');
        console.error(error);
      }
    };

    fetchCourseData();
  }, [courseid]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`http://localhost:9001/admin/feedbacks/course/${courseid}`);
      setFeedbacks(response.data);
      setShowFeedbacks(true); // Show feedbacks after fetching
      fetchEmployeeUsernames(response.data);
      processRatingData(response.data); // Process ratings for the pie chart
    } catch (error) {
      setFeedbackError('Error fetching feedbacks.');
      console.error(error);
    }
  };

  // Function to fetch usernames based on employee IDs from feedbacks
  const fetchEmployeeUsernames = async (feedbacks) => {
    const usernames = {};
    await Promise.all(
      feedbacks.map(async (feedback) => {
        try {
          const employeeResponse = await axios.get(`http://localhost:9001/admin/employees/${feedback.employeeid}`);
          usernames[feedback.employeeid] = employeeResponse.data.username;
        } catch (error) {
          console.error(`Error fetching username for employee ID ${feedback.employeeid}`, error);
        }
      })
    );
    setEmployeeUsernames(usernames);
  };

  // Function to process feedback ratings for the pie chart
  const processRatingData = (feedbacks) => {
    const ratingCounts = [0, 0, 0, 0, 0]; // Assuming ratings are 1 to 5

    feedbacks.forEach(feedback => {
      if (feedback.rating >= 1 && feedback.rating <= 5) {
        ratingCounts[feedback.rating - 1] += 1;
      }
    });

    setRatingData(ratingCounts);
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!course) return <div>Loading...</div>;

  // Function to render embedded YouTube video
  const renderYouTubeVideo = (url) => {
    const videoId = url.split('v=')[1].split('&')[0];
    return (
      <div className="mt-4">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  // Data and options for Pie chart
  const pieData = {
    labels: ['Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'],
    datasets: [
      {
        data: ratingData,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back
        </button>

      <h1 className="text-2xl font-bold mb-4">{course.coursename}</h1>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {course.description}</p>
      <p className="text-gray-700 mb-4"><strong>Duration:</strong> {course.duration}</p>

      {/* Display resource links with embedded YouTube videos */}
      {course.resourcelinks && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Resource Links:</h2>
          {course.resourcelinks.split(', ').map((link, index) => (
            <div key={index} className="mb-4">
              {link.includes('youtube.com') ? renderYouTubeVideo(link) : (
                <a href={link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Display other details */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Other Links:</h2>
        {course.otherlinks && (
          <div>
            {course.otherlinks.split(', ').map((link, index) => (
              <a key={index} href={link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Outcomes:</h2>
        <p>{course.outcomes}</p>
      </div>
      {/* Button to view feedbacks */}
      <div>
        <button
          type="button"
          onClick={fetchFeedbacks}
          className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
        >
          View Course Feedbacks
        </button>
      </div>

      {/* Display feedbacks if available */}
      {feedbackError && <div className="text-red-500">{feedbackError}</div>}
      {showFeedbacks && feedbacks.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Feedbacks:</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Feedback ID</th>
                <th className="py-2 px-4 border">Feedback</th>
                <th className="py-2 px-4 border">Rating</th>
                <th className="py-2 px-4 border">Submitted By</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.feedbackId}>
                  <td className="py-2 px-4 border">{feedback.feedbackid}</td>
                  <td className="py-2 px-4 border">{feedback.comments}</td>
                  <td className="py-2 px-4 border">{feedback.rating}</td>
                  <td className="py-2 px-4 border">{employeeUsernames[feedback.employeeid] || feedback.employeeid}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Render Pie Chart for Ratings */}
          <div className="mt-8" style={{ height: '400px' }}>
            <h2 className="text-xl font-semibold mb-4">Feedback Rating Distribution</h2>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourse;
