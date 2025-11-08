import React from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Register from "./auth/Register";
import Login from "./auth/Login";
import UserDashboard from "./userPanel/UserDashboard";
import BrowseCourse from "./userPanel/BrowseCourse";
import MyCourses from "./userPanel/EnrolledCourse";
import CompletedCourse from "./userPanel/CompletedCourse.";
import Profile from "./userPanel/Profile";
import PaymentPage from "./userPanel/PaymentPage";
import CoursePlayer from "./userPanel/CoursePlayer";
import AdminDashboard from "./adminPanel/AdminDashboard";
import CreateCourse from "./adminPanel/CreateCourse";
import Overview from "./adminPanel/Overview";
import Courses from "./adminPanel/Courses";
import Users from "./adminPanel/Users";
import Revenue from "./adminPanel/Revenue";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />

          {/* ✅ User Dashboard Nested Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />}>
            <Route index element={<BrowseCourse />} /> {/* Default */}
            <Route path="browse" element={<BrowseCourse />} />
            <Route path="my-courses" element={<MyCourses/>} />
            <Route path="completed-courses" element={<CompletedCourse />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Other user pages */}
          <Route path="/user/enroll/:courseId/:userId" element={<PaymentPage />} />
          <Route path="/user/coursePlayer/:courseId/:userId" element={<CoursePlayer />} />

          {/* ✅ Admin Dashboard Nested Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="courses" element={<Courses />} />
            <Route path="users" element={<Users />} />
            <Route path="revenue" element={<Revenue />} />
          </Route>

          <Route path="/admin/create-course" element={<CreateCourse />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
