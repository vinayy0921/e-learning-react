import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from "../context/AuthContext";
import Footer from './Footer';
import '../styles/UserDash.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Header */}
      <Header user={user} />
      <h1 className="p-3 m-0" style={{backgroundColor: "var(--header-color)"}}>Welcome {user.name}</h1>

      {/* Tabs → NavLinks */}
        <ul className="nav nav-tabs mb-4 d-flex justify-content-evenly" style={{backgroundColor: "var(--header-color)"}} >
          <li className="nav-item">
            <NavLink
              to="browse"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-semibold' : ''}`
              }
            >
              Browse Courses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="my-courses"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-semibold' : ''}`
              }
            >
              My Courses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="completed-courses"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-semibold' : ''}`
              }
            >
              Completed Courses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-semibold' : ''}`
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>
      <div className="container-fluid" >

        {/* Nested Route Content */}
        <div className="tab-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
