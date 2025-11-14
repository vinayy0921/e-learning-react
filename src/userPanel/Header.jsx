import React from 'react'
import { BookOpen } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

export default function Header(props) {
  const { theme } = useTheme(); 
  const user = props.user || {}; 

  // profile image check
  const profileImage = user.profile_path
    ? `http://localhost:8080/E-learning/${user.profile_path.replace("../", "")}`
    : null;  // if null → fallback to letter

  return (
    <div>
      <nav className={`navbar navbar-expand-lg border-bottom sticky-top px-2 ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}>
        
        <div className="container-fluid">
          
          {/* Brand */}
          <div className="d-flex align-items-center">
            <div className="navbar-brand d-flex align-items-center me-4">
              <BookOpen size={24} color={theme === "dark" ? "#f8f9fa" : "#030213"} className="me-2" />
              <span className="h5 mb-0 fw-semibold">LearnHub</span>
            </div>
          </div>

          {/* Right Side (Profile) */}
          <div className="d-flex align-items-center gap-3">

            <div className="d-flex align-items-center gap-2">

              {/* Profile Image OR Letter */}
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="profile"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #6dd5fa",
                  }}
                />
              ) : (
                <div
                  className="bg-secondary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px' }}
                >
                  <span className="text-white small">{user.name?.charAt(0)}</span>
                </div>
              )}

              <span className="small">{user.name}</span>
            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}
