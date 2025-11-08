import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  // 🔹 Handle logout
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle profile save
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/e-api/updateProfile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, ...formData }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        // ✅ Update context
        setUser({ ...user, name: formData.name, email: formData.email });

        // ✅ Close modal
        const modalEl = document.getElementById("editProfileModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        // ✅ Reset password field
        setFormData({ ...formData, password: "" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div
      className="container py-4"
      style={{
        color: theme === "dark" ? "#e9ecef" : "#212529",
        backgroundColor: theme === "dark" ? "#0d1117" : "#f8f9fa",
        borderRadius: "10px",
        minHeight: "80vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold">Profile</h3>
        {/* Theme Toggle */}
        <button
          className={`btn btn-sm ${
            theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
          } rounded-circle`}
          onClick={toggleTheme}
          title="Toggle Theme"
          style={{width:"40px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center"}}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Profile Info */}
      <div
        className={`text-center p-4 rounded shadow-sm ${
          theme === "dark" ? "bg-dark text-light" : "bg-white"
        }`}
      >
        <i
          className={`fa-solid fa-circle-user fa-5x mb-3 ${
            theme === "dark" ? "text-light" : "text-secondary"
          }`}
        ></i>
        <h3 className="fw-bold mb-1">{user?.name}</h3>
        <p className="mb-1">{user?.email}</p>
        <span className="badge bg-info text-dark">Student</span>
      </div>

      {/* Profile Settings */}
      <div
        className={`card mt-4 shadow-sm border-0 ${
          theme === "dark" ? "bg-dark text-light" : "bg-white"
        }`}
      >
        <div className="card-body">
          <h5 className="card-title mb-3 fw-semibold">Account Settings</h5>
          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-primary"
              }`}
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              <i className="fa fa-edit me-1"></i> Edit Profile
            </button>
            <button
              className={`btn ${
                theme === "dark" ? "btn-outline-danger" : "btn-outline-danger"
              }`}
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out-alt me-1"></i> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className={`modal-content ${
              theme === "dark" ? "bg-dark text-light" : "bg-white"
            }`}
          >
            <form onSubmit={handleSave}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-semibold">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor:
                        theme === "dark" ? "#1e1e1e" : "#ffffff",
                      color: theme === "dark" ? "#f8f9fa" : "#212529",
                      borderColor:
                        theme === "dark" ? "#444" : "rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor:
                        theme === "dark" ? "#1e1e1e" : "#ffffff",
                      color: theme === "dark" ? "#f8f9fa" : "#212529",
                      borderColor:
                        theme === "dark" ? "#444" : "rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Password (Leave blank to keep same)
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-3"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                      backgroundColor:
                        theme === "dark" ? "#1e1e1e" : "#ffffff",
                      color: theme === "dark" ? "#f8f9fa" : "#212529",
                      borderColor:
                        theme === "dark" ? "#444" : "rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="submit"
                  className={`btn ${
                    theme === "dark" ? "btn-light" : "btn-success"
                  }`}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className={`btn ${
                    theme === "dark" ? "btn-outline-light" : "btn-secondary"
                  }`}
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
