import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FeedbackForm from './FeedbackForm';
import EmployeeNavbar from './EmployeeNavbar';


const CourseDetails = () => {
  const { coursename } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [employeeid, setEmployeeId] = useState(null);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch assigned courses
    const fetchAssignedCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9001/admin/employees/courses/${username}`
        );
        setAssignedCourses(response.data);
      } catch (err) {
        setError('Error fetching assigned courses');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedCourses();
  }, [username]);

  useEffect(() => {
    // Fetch course details
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9001/admin/courses/name/${coursename}`
        );
        setCourseDetails(response.data);
      } catch (err) {
        setError('Error fetching course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [coursename]);

  useEffect(() => {
    // Fetch employee ID
    const fetchEmployeeId = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(
          `http://localhost:9001/admin/employees/username?username=${username}`
        );
        setEmployeeId(response.data.employeeid);
      } catch (err) {
        setError('Error fetching employee ID');
        setLoading(false);
      }
    };

    fetchEmployeeId();
  }, []);

  useEffect(() => {
    // Check if feedback has already been submitted
    const checkFeedbackSubmitted = async () => {
      if (courseDetails && employeeid) {
        try {
          const response = await axios.get(
            `http://localhost:9001/admin/feedbacks/course/${courseDetails.courseid}`
          );
          // Check if feedback from the specific employee exists
          const hasFeedback = response.data.some(
            (feedback) => feedback.employeeid === employeeid
          );
          setIsFeedbackSubmitted(hasFeedback);
        } catch (err) {
          setError('Error checking feedback submission');
        }
      }
    };

    checkFeedbackSubmitted();
  }, [courseDetails, employeeid]);

  const extractYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const renderIframe = (url) => {
    const videoId = extractYouTubeID(url);
    if (!videoId) return null;
    return (
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="mb-4"
      ></iframe>
    );
  };

  const renderPdfIframe = (url) => {
    if (!url.endsWith('.pdf')) return null;
    return (
      <iframe
        src={url}
        width="100%"
        height="500px"
        title="PDF Viewer"
        className="mb-4 border"
      ></iframe>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-10">
      <EmployeeNavbar />
      <button
        onClick={() => navigate('/employee-dashboard')}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-auto"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Course Details</h1>
      {courseDetails && (
        <div className="mt-6 p-4 border rounded shadow">
          <h3 className="text-xl font-semibold mb-2">
            {courseDetails.coursename}
          </h3>
          <p>
            <strong>Description:</strong> {courseDetails.description}
          </p>
          <p className="mt-4 mb-2 font-semibold">Resource Links:</p>
          {courseDetails.resourcelinks &&
            courseDetails.resourcelinks.split(',').map((link, index) => (
              <div key={index}>{renderIframe(link)}</div>
            ))}
          <p className="mt-4 mb-2 font-semibold">Other Links:</p>
          {courseDetails.otherlinks &&
            courseDetails.otherlinks.split(',').map((link, index) => (
              <div key={index}>
                {renderPdfIframe(link) || (
                  <p className="text-sm text-gray-600">
                    Unable to display content.{' '}
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Click here
                    </a>{' '}
                    to view: {link}
                  </p>
                )}
              </div>
            ))}
          <p>
            <strong>Outcomes:</strong> {courseDetails.outcomes}
          </p>
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            disabled={isFeedbackSubmitted}
          >
            {isFeedbackSubmitted ? 'Feedback Submitted' : 'Give Feedback'}
          </button>
        </div>
      )}
      {showFeedbackForm && (
        <FeedbackForm
          courseid={courseDetails?.courseid}
          employeeid={employeeid}
          onClose={() => setShowFeedbackForm(false)}
          onSubmitSuccess={() => setIsFeedbackSubmitted(true)}
        />
      )}
    </div>
  );
};

export default CourseDetails;
