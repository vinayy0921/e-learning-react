import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Edit2, X } from "lucide-react";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 🔹 Logout
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  // 🔹 Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Save profile details
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
        const updatedUser = { ...user, name: formData.name, email: formData.email };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        const modalEl = document.getElementById("editProfileModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        modal?.hide();

        setFormData({ ...formData, password: "" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // 🔹 Handle profile picture upload
  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("profile_pic", file);
    formData.append("userId", user.id);

    try {
      const res = await fetch("http://localhost:8080/e-api/updateProfilePic.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message);

      if (data.success) {
        const updatedUser = { ...user, profile_path: data.profile_path };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setShowImageModal(false);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const profileImage = user?.profile_path
    ? `http://localhost:8080/E-learning/${user.profile_path.replace("../", "")}`
    : "/uploads/others/profile2.jpg";

  return (
    <div
      className="container py-4"
      style={{
        color: theme === "light" ? "#212529" : "#e9ecef",
        backgroundColor: theme === "dark" ? "#0d1117" : "#f8f9fa",
        borderRadius: "10px",
        minHeight: "80vh",
      }}
    >
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-semibold">Profile</h3>
        <button
          className={`btn btn-sm ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
            } rounded-circle`}
          onClick={toggleTheme}
          title="Toggle Theme"
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Profile Info Section */}
      <div
        className={`text-center p-4 rounded shadow-sm ${theme === "dark" ? "bg-dark text-light" : "bg-white"
          }`}
      >
        {/* Profile Avatar */}
        <div
          onClick={() => setShowImageModal(true)}
          className="position-relative my-3 d-flex align-items-center justify-content-center"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            padding: "3px",
            background: "linear-gradient(135deg, #6dd5fa, #2980b9)",
            margin: "auto",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              overflow: "hidden",
              background: theme === "dark" ? "#1e1e1e" : "#fff",
            }}
          >
            <img
              src={profileImage}
              alt="profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                title: "Click to change profile picture",
              }}
            />
          </div>
        </div>

        <h3 className="fw-bold mb-1">{user?.name}</h3>
        <p className="mb-1">{user?.email}</p>
        <span className="badge bg-info text-dark">Student</span>
      </div>

      {/* ✅ Account Settings Section */}
      <div
        className={`card mt-4 shadow-sm border-0 ${theme === "dark" ? "bg-dark text-light" : "bg-white"
          }`}
      >
        <div className="card-body">
          <h5 className="card-title mb-3 fw-semibold">Account Settings</h5>
          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-primary"
                }`}
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              <i className="fa fa-edit me-1"></i> Edit Profile
            </button>

            <button
              className={`btn ${theme === "dark" ? "btn-outline-danger" : "btn-outline-danger"
                }`}
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out-alt me-1"></i> Logout
            </button>
          </div>
        </div>
      </div>

      {/* 🖼️ Profile Image Modal */}
      {showImageModal && (
        <div
          className="modal show d-flex align-items-center justify-content-center"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            zIndex: 1050,
          }}
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="position-relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              background:
                theme === "dark"
                  ? "rgba(20,20,20,0.95)"
                  : "rgba(255,255,255,0.97)",
              borderRadius: "12px",
              padding: "20px",
              maxWidth: "420px",
              width: "92%",
              textAlign: "center",
              boxShadow:
                theme === "dark"
                  ? "0 0 25px rgba(255,255,255,0.08)"
                  : "0 0 25px rgba(0,0,0,0.15)",
            }}
          >
            <button
              className="btn btn-sm btn-danger position-absolute"
              style={{ top: "10px", right: "10px" }}
              onClick={() => setShowImageModal(false)}
            >
              <X size={16} />
            </button>

            <img
              src={profileImage}
              alt="Full Profile"
              style={{
                width: "100%",
                borderRadius: "10px",
                objectFit: "cover",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
            />

            <label
              htmlFor="profile-upload"
              className={`btn mt-3 ${theme === "light" ? "btn-primary" : "btn-dark"
                }`}
              style={{ cursor: uploading ? "not-allowed" : "pointer" }}
            >
              {uploading ? "Uploading..." : (
                <>
                  <Edit2 size={16} className="me-1" /> Edit Picture
                </>
              )}
            </label>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
              disabled={uploading}
            />
          </div>
        </div>
      )}

      {/* ✏️ Edit Profile Modal */}
      <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div
            className={`modal-content ${theme === "dark" ? "bg-dark text-light" : "bg-white"
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
                  className={`btn ${theme === "dark" ? "btn-light" : "btn-success"
                    }`}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className={`btn ${theme === "dark"
                      ? "btn-outline-light"
                      : "btn-secondary"
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
