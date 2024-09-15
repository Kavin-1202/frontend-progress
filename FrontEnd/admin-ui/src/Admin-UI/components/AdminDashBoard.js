import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBarComponent from "./NavBarComponent";
import { toast, ToastContainer } from "react-toastify";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emails, setEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Added for success messages
  const baseUrl = "http://localhost:9001/admin";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(baseUrl + "/courses/dashboard");
        setRequests(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Error fetching requests");
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();

    const interval = setInterval(fetchRequests, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleViewClick = (requestid) => {
    navigate(`/request-details/${requestid}`);
  };

  const handleCreateClick = (requestid) => {
    navigate(`/create-course/${requestid}`);
  };

  const numberOfCoursesCreated = new Set(
    requests.map((request) => request.coursename)
  ).size;
  const numberOfEmployees = new Set(
    requests.map((request) => request.managername)
  ).size;
  const numberOfRequests = requests.length;

  const statistics = {
    numberOfCoursesCreated,
    numberOfEmployees,
    numberOfRequests,
  };

  const pendingRequests = requests.filter(
    (request) => request.status !== "COMPLETED"
  );
  const completedRequests = requests.filter(
    (request) => request.status === "COMPLETED"
  );

  const handleAddEmployeeClick = () => {
    setShowModal(true);
  };

  const handleEmailSubmit = () => {
    if (currentEmail.trim() !== "") {
      setEmails([...emails, currentEmail]);
      setCurrentEmail("");
    }
  };

  const handleSendEmails = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/employees/addemployees`,
        emails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Emails sent successfully:", response.data);
      setSuccessMessage("Emails sent successfully");
      toast.success('credentials sent successfully');
      setEmails([]); // Clear the email list after successful send
    } catch (error) {
      console.error("Failed to send emails:", error);
      setError("Failed to send emails. Please try again.");
    }
    setShowModal(false);
  };

  // Logout handler
  const handleLogout = () => {
    // Implement your logout logic here, e.g., clearing tokens, etc.
    console.log("User logged out");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="p-6 space-y-6">
      <NavBarComponent onLogout={handleLogout} /> {/* Pass handleLogout as a prop */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={handleAddEmployeeClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
        >
          <span>+ Add Employees</span>
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="text-2xl font-bold">
                {statistics.numberOfCoursesCreated}
              </p>
              <p className="text-sm">Courses Created</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="text-2xl font-bold">{statistics.numberOfEmployees}</p>
              <p className="text-sm">Employees</p>
            </div>
            <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
              <p className="text-2xl font-bold">{statistics.numberOfRequests}</p>
              <p className="text-sm">Requests</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4">Pending Requests</h4>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2 text-sm font-semibold text-gray-700">
            <div className="w-1/12">SL No</div>
            <div className="w-3/12">Manager Name</div>
            <div className="w-4/12">Training Program</div>
            <div className="w-4/12 text-center">Actions</div>
          </div>
          <div className="space-y-4">
            {pendingRequests.map((request, index) => (
              <div
                key={request.requestid}
                className="flex items-center justify-between p-4 border-b border-gray-200"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-1/12 text-gray-700">{index + 1}</div>
                  <div className="w-3/12 text-gray-700">{request.managername}</div>
                  <div className="w-4/12 text-gray-700">{request.coursename}</div>
                  <div className="w-4/12 flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        handleViewClick(request.requestid);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        handleCreateClick(request.requestid);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4">Completed Requests</h4>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2 text-sm font-semibold text-gray-700">
            <div className="w-1/12">SL No</div>
            <div className="w-3/12">Manager Name</div>
            <div className="w-4/12">Training Program</div>
            <div className="w-4/12 text-center">Actions</div>
          </div>
          <div className="space-y-4">
            {completedRequests.map((request, index) => (
              <div
                key={request.requestid}
                className="flex items-center justify-between p-4 border-b border-gray-200"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-1/12 text-gray-700">{index + 1}</div>
                  <div className="w-3/12 text-gray-700">{request.managername}</div>
                  <div className="w-4/12 text-gray-700">{request.coursename}</div>
                  <div className="w-4/12 flex justify-center">
                    <button
                      onClick={() => {
                        handleViewClick(request.requestid);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add Employees</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <div className="mb-4">
              <input
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                placeholder="Enter email"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
              <button
                onClick={handleEmailSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Add Email
              </button>
            </div>
            <div className="mb-4">
              <ul>
                {emails.map((email, index) => (
                  <li key={index} className="mb-2">
                    {email}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleSendEmails}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Send Emails
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default AdminDashboard;
