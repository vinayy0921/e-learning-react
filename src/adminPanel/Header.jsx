import React from "react";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // ✅ import theme context

export default function Header({ user = "Admin", logout }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // ✅ theme control

  const handleLogout = () => {
    logout?.();
    navigate("/");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg border-bottom sticky-top ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
    >
      <div className="container-fluid px-3 px-md-4">
        {/* Left Section — Logo + Title */}
        <div className="d-flex align-items-center">
          <BookOpen size={26} color={theme === "dark" ? "#f8f9fa" : "#030213"} className="me-2" />
          <span className="fw-semibold fs-5">LearnHub Admin</span>
        </div>

        {/* Right Section — User + Theme + Logout */}
        <div className="d-flex align-items-center gap-3 flex-wrap mt-2 mt-lg-0">

          <button
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <>
                <i className="fa-solid fa-moon"></i>
                <span className="d-none d-sm-inline">Dark</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-sun"></i>
                <span className="d-none d-sm-inline">Light</span>
              </>
            )}
          </button>


          {/* 👤 User Section */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "34px",
                height: "34px",
                backgroundColor: theme === "dark" ? "#495057" : "#6c757d",
              }}
            >
              <span className="text-white fw-semibold">{user.charAt(0).toUpperCase()}</span>
            </div>
            <span className="small fw-medium text-nowrap">{user}</span>
          </div>

          {/* 🚪 Logout Button */}
          <button
            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="d-none d-sm-inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
