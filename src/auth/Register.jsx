import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {register} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const result = await register(formData.name, formData.email, formData.password);
    console.log(result);
    if(result.success){
      navigate('/user/dashboard');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top">
        <div className="container">
          <Link to="/" style={{textDecoration:'none'}}>&larr; Back</Link>
          <div className="navbar-brand d-flex align-items-center">
            <BookOpen className="me-2" size={32} color="#030213" />
            <span className="h4 mb-0 fw-semibold">LearnHub</span>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-center align-items-center min-vh-90 bg-light ">
        <div className="card shadow-lg border-0 rounded-4 p-4 mt-5" style={{ maxWidth: "550px", width: "100%" }}>
          <div className="card-header bg-white border-0 text-center mb-2">
            <h3 className="fw-bold text-primary">Create Student Account</h3>
            <p className="text-muted small">Fill the details below to get started</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                {/* name */}
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                {/* email */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                {/* password */}
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="password"
                    placeholder=" Atleast 8 characters"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                </div>
                {/* confirm password */}
                <div className="col-md-6">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="confirmPassword"
                    placeholder=" Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 rounded-3 py-2">
                Create Account
              </button>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="text-primary text-decoration-none">Login</Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
