import React, { useEffect } from "react";
import Header from "./Header";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../userPanel/Footer";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)" }}>
      {/* Header */}
      <Header user={user.name} logout={logout} />

      {/* Main Content */}
      <div >
        <div className="d-flex justify-content-between align-items-center pb-4 py-4" style={{backgroundColor: "var(--header-color)"}}>
          <h1 className="h3 px-4">Admin Dashboard</h1>
        </div>

        {/* ✅ Nav Tabs as Links */}
        
        <ul className="nav nav-tabs mb-4 d-flex justify-content-evenly " style={{backgroundColor: "var(--header-color)"}}>
          <li className="nav-item">
            <NavLink
              to="overview"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Overview
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="courses"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Courses
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="users"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="revenue"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              Revenue
            </NavLink>
          </li>
        </ul>

        {/* ✅ Render nested route content here */}
        <div className="tab-content container-fluid px-4 pb-5">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
