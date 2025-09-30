import React, { useState, useEffect } from 'react'
import Header from './Header'
import CompletedCourse from './CompletedCourse.';
import BrowseCourse from './BrowseCourse';
import Profile from './Profile';
import MyCourses from './EnrolledCourse';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const { user } = useAuth();
  const navigate = useNavigate();
  // console.log(user);

  useEffect(() => {
    if (user === null) {
      navigate('/auth/login');
      return;
    }
  }, [user, navigate]);
  if (user === null) {
    return (
     <div>loading</div>
    );
  }
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <Header name={user.name} />
      <h1 className='m-3'>Welcome {user.name}</h1>

      {/* Main Content */}
      <div className="container-fluid py-4">
        <ul className="nav nav-tabs mb-4 d-flex justify-content-evenly" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'browse' ? 'active' : ''}`}
              onClick={() => setActiveTab('browse')}
            >
              Browse Courses
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'my-courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-courses')}
            >
              My Courses
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'completed-courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed-courses')}
            >
              Completed Courses
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'browse' && (
            <BrowseCourse userId={user.id} />
          )}

          {activeTab === 'my-courses' && (
            <MyCourses id={user.id} />
          )}

          {activeTab === 'completed-courses' && (
            <CompletedCourse id={user.id} />
          )}

          {activeTab === 'profile' && (
            <Profile  />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
