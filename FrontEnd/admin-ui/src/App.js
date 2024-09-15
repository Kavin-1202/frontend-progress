import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Admin-UI/components/AdminDashBoard';

import CourseDisplayPage from './Admin-UI/components/CourseDisplayPage';
import CreateCourseForm from './Admin-UI/components/CreateCourseForm';
import EditCourseForm from './Admin-UI/components/EditCourseForm';
import ViewCourse from './Admin-UI/components/ViewCourse';

import AccountTeamDashboard from './Account-UI/Components/AccountTeamDashboard';
import CreateRequest from './Account-UI/Components/CreateRequest';
import RequestDetails from './Admin-UI/components/RequestDetails';
import { ToastContainer } from 'react-toastify';
import HomePage from './Home-UI/components/HomePage';
import SignupForm from './Home-UI/components/Signup';
import LoginForm from './Home-UI/components/Login';

import CourseDetails from './Employee-components/CourseDetails';
import EmployeeHome from './Employee-components/EmployeeHome';
import MyCourses from './Employee-components/MyCourses';
import ProgressComponent from './Employee-components/ProgressComponent';
import AdminProgressComponent from './Admin-UI/components/AdminProgressComponent';

function App() {
  
  return (
    <Router>
      <div>
      <Routes>
        {/*Home Routes*/}
        <Route path='/' element={<HomePage/>}/>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Admin Routes*/}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/request-details/:requestid" element={<RequestDetails />} />
        <Route path="/create-course/:requestid" element={<CreateCourseForm/>} />
        <Route path="/courses" element={<CourseDisplayPage/>} /> 
        <Route path='/edit-course/:courseid' element={<EditCourseForm/>}/>
        <Route path="/view-course/:courseid" element={<ViewCourse/>} />
        {/* Admin Route for tracking all employees */}
        <Route
            path="/admin-all-progress"
            element={<AdminProgressComponent />}
          />
        
        {/* Accounts Route*/}
        <Route path="/manager-dashboard" element={<AccountTeamDashboard/>} />
        <Route path="/create-request" element={<CreateRequest/>} />

      {/* Employee Routes*/}
      <Route path="/employee-dashboard" element={<EmployeeHome />} /> {/* Home page */}
      <Route path="/courses/:coursename" element={<CourseDetails />} /> {/* Course details page */}
      <Route path="/my-courses" element={<MyCourses />} />
      {/* New Route for Progress */}
      <Route path="/progress" element={<ProgressComponent />} /> {/* Progress page */}
      </Routes>
      <ToastContainer/>
      </div>
     
    </Router>
  );
};

export default App;
