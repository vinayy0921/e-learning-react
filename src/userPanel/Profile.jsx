import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
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
    <div className="container mt-4">
      {/* Profile Info */}
      <div className="profile-header mb-4 text-center">
        <i className="fa-solid fa-circle-user icon fa-4x mb-2"></i>
        <h3 className="mb-1">{user?.name}</h3>
        <p className="mb-1">{user?.email}</p>
        <span className="badge bg-info">Student</span>
      </div>

      {/* Profile Settings */}
      <div className="card card-custom">
        <div className="card-body">
          <h5 className="card-title mb-3">Profile Settings</h5>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              <i className="fa fa-edit"></i> Edit Profile
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out-alt"></i> Logout
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
          <div className="modal-content">
            <form onSubmit={handleSave}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
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
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Password (Leave blank to keep same)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
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
