import React,{useEffect} from 'react'
import Header from './Header';
import Overview from './Overview';
import Courses from './Courses';
import Users from './Users';
import { useAuth } from "../context/AuthContext";
import Revenue from './Revenue';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {

    const [activeTab, setActiveTab] = React.useState("overview");
      const { user, logout } = useAuth();
      const navigate = useNavigate();

      useEffect(() => {
          if (!user) {
            navigate('/auth/login');
            return;
          }
        }, [user, navigate]);

          if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <Header user={user.name} logout={logout} />

      {/* Main Content */}
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Admin Dashboard</h1>
            
        </div>

        <ul className="nav nav-tabs mb-4 d-flex justify-content-evenly" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "courses" ? "active" : ""}`}
              onClick={() => setActiveTab("courses")}
            >
              Courses
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "revenue" ? "active" : ""}`}
              onClick={() => setActiveTab("revenue")}
            >
              Revenue
            </button>
          </li>
          
        </ul>

        <div className="tab-content">
          {activeTab === "overview" && (
            <Overview/>

          )}

          {activeTab === "courses" && (
           <Courses/>
          )}

          {/* NOt working --- fixing it Later  */}
          {activeTab === "users" && (
            <Users/>
          )}

          {activeTab === "revenue" && (
           <Revenue/>
          )}


        </div>
      </div>

      
    </div>
  )
}
