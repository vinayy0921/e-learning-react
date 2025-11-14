import React, { useEffect, useState } from "react";
const API = "http://localhost:8080/e-api/";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all Users
  useEffect(() => {
    fetch(`${API}fetchUsers.php`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter Users
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch User Courses
  const openModal = (user) => {
    setSelectedUser(user);
    setUserCourses([]);

    fetch(`${API}fetchUserCourses.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => setUserCourses(data))
      .catch(() => setUserCourses([]));
  };

  // Toggle Active / Deactive
  const toggleActive = (userId) => {
    fetch(`${API}toggleUser.php?id=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(prev =>
            prev.map(u => (u.id === userId ? { ...u, is_active: data.is_active } : u))
          );
        }
      });
  };

  // Profile picture logic
  const getProfileImage = (path) => {
    return path
      ? `http://localhost:8080/E-learning/${path}`
      : null;
  };

  return (
    <div className="container-fluid py-4">

      {/* Header + Search */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>User Management</h4>
        <input
          type="text"
          placeholder="Search users..."
          className="form-control w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Courses</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="user-row smooth-row">
                  
                  {/* Profile + Info */}
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      {getProfileImage(user.profile_path) ? (
                        <img
                          src={getProfileImage(user.profile_path)}
                          alt="profile"
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #6dd5fa"
                          }}
                        />
                      ) : (
                        <i className="fa-regular fa-circle-user me-2" style={{ fontSize: 30 }}></i>
                      )}

                      <div>
                        <p className="small mb-0 fw-medium">{user.name}</p>
                        <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    {user.is_active === "1"
                      ? <span className="text-success">Active</span>
                      : <span className="text-danger">Deactive</span>}
                  </td>

                  <td className="small">{user.created_at}</td>

                  <td className="small">{user.total_courses}</td>

                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => openModal(user)}>
                        <i className="fa-regular fa-eye me-1"></i>View
                      </button>

                      <button
                        className={`btn btn-sm ${user.is_active === "1" ? "btn-outline-danger" : "btn-outline-success"}`}
                        onClick={() => toggleActive(user.id)}
                      >
                        <i className={`fa-solid ${user.is_active === "1" ? "fa-user-slash" : "fa-user-check"} me-1`}></i>
                        {user.is_active === "1" ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedUser && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              
              <div className="modal-header">
                <h5 className="modal-title">{selectedUser.name} - Details</h5>
                <button className="btn-close" onClick={() => setSelectedUser(null)}></button>
              </div>

              <div className="modal-body text-center">

                {/* Modal Profile Image */}
                {getProfileImage(selectedUser.profile_path) ? (
                  <img
                    src={getProfileImage(selectedUser.profile_path)}
                    alt="profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #6dd5fa"
                    }}
                    className="mb-3"
                  />
                ) : (
                  <i className="fa-regular fa-circle-user mb-3" style={{ fontSize: 100 }}></i>
                )}

                <h5>{selectedUser.name}</h5>
                <p className="text-muted small mb-0">{selectedUser.email}</p>
                <p className="text-muted small mb-3">Joined: {selectedUser.created_at}</p>

                {/* Courses Table */}
                <h6 className="fw-bold text-start mt-3">Courses Enrolled:</h6>
                <table className="table table-sm table-bordered align-middle">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Instructor</th>
                      <th>Date Enrolled</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userCourses.length === 0 ? (
                      <tr><td colSpan="3" className="text-center text-muted">No courses enrolled</td></tr>
                    ) : (
                      userCourses.map((c, i) => (
                        <tr key={i}>
                          <td>{c.title}</td>
                          <td>{c.instructor}</td>
                          <td>{new Date(c.enrolled_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Close</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
