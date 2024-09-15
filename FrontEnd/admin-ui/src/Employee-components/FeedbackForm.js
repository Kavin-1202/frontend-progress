import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FeedbackForm = ({ courseid, employeeid, onClose,onSubmitSuccess }) => {
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9001/admin/feedbacks/submit', {
        courseid,
        employeeid,
        comments,
        rating,
      });
      setSuccess('Feedback submitted successfully!');
      setComments('');
      setRating(0);
      onSubmitSuccess(); // Update the state in the parent component
      onClose(); // Close the feedback form after submission
      // navigate(-1);
    } catch (err) {
      setError('Failed to submit feedback.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-semibold mb-4">Submit Feedback</h3>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full mt-1 border rounded p-2"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating (1-5)</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value, 6))}
              className="w-full mt-1 border rounded p-2"
              min="1"
              max="5"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
