import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();  // ✅ get user also
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Auto-redirect if already logged in (from localStorage)
  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        navigate("/user/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [user, navigate]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        if (result.role === "student") {
          navigate("/user/dashboard");
        } else if (result.role === "admin") {
          navigate("/admin/dashboard");
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top">
        <div className="container">
          <Link to="/" style={{ textDecoration: "none" }}>
            &larr; Back
          </Link>
          <div className="navbar-brand d-flex align-items-center">
            <BookOpen className="me-2" size={32} color="#030213" />
            <span className="h4 mb-0 fw-semibold">LearnHub</span>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-center align-items-center pb-5 bg-light">
        <div
          className="card shadow-lg border-0 rounded-4 p-4 mt-5"
          style={{ maxWidth: "450px", width: "100%" }}
        >
          <div className="card-header bg-white border-0 text-center mb-2">
            <h3 className="fw-bold text-primary">Sign In</h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control rounded-start-3"
                    id="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary border-none rounded-end-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              {loading ? (
                <button
                  className="btn btn-primary w-100 rounded-3"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Signing In...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-3"
                >
                  Sign In
                </button>
              )}

              {error && (
                <div
                  className="alert alert-danger mt-3 text-center"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <hr className="my-4" />

              {/* Sign Up Link */}
              <div className="text-center">
                <small className="text-muted">
                  Don’t have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-primary text-decoration-none"
                  >
                    Sign up
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
