import React from 'react';
import './styles/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './LandingPage';
import Register from './auth/Register';
import Login from './auth/Login';
import UserDashboard from './userPanel/UserDashboard';
import PaymentPage from './userPanel/PaymentPage';
import CoursePlayer from './userPanel/CoursePlayer';
import AdminDashboard from './adminPanel/AdminDashboard';
import CreateCourse from './adminPanel/CreateCourse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path='/user/enroll/:courseId/:userId' element={<PaymentPage />} />
      <Route path='/user/coursePlayer/:courseId/:userId' element={<CoursePlayer/>} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/create-course" element={<CreateCourse />} />
      {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
