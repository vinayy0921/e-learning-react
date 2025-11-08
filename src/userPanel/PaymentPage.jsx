import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CreditCard, QrCode, PlayCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // ✅ Theme Context

const API = "http://localhost:8080/e-api/";

export default function PaymentPage() {
  const { courseId, userId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ Get current theme

  if (!courseId || !userId) {
    navigate("/user/dashboard");
  }

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(""); // "card" or "upi"
  const [form, setForm] = useState({ number: "", expiry: "", cvv: "", holder: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [courseRes, lessonRes, commentRes] = await Promise.all([
          axios.get(`${API}CourseData.php?id=${courseId}`),
          axios.get(`${API}getLessons.php?course_id=${courseId}&userId=${userId}`),
          axios.get(`${API}getComment.php?course_id=${courseId}`),
        ]);
        setCourse(courseRes.data);
        setLessons(lessonRes.data);
        setComments(commentRes.data);
      } catch (err) {
        console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [courseId, userId]);

  const validate = () => {
    let e = {};
    if (!/^\d{16}$/.test(form.number.replace(/-/g, ""))) e.number = "Card number must be 16 digits.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) e.expiry = "Enter valid MM/YY.";
    if (!/^\d{3}$/.test(form.cvv)) e.cvv = "CVV must be 3 digits.";
    if (!/^[a-zA-Z\s]+$/.test(form.holder)) e.holder = "Name can only contain letters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post(`${API}enroll.php`, {
        course_id: courseId,
        user_id: userId,
        amount: course.price,
        method: "card",
        ...form,
      });
      alert("Payment successful! 🎉");
      navigate("/user/dashboard");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-5 text-muted">Loading course...</p>
    );
  if (!course)
    return <p className="text-center mt-5 text-muted">Course not found.</p>;

  // ✅ Apply theme classes dynamically
  const bgClass = theme === "dark" ? "bg-dark text-light" : "bg-white text-dark";
  const cardClass = theme === "dark" ? "bg-secondary text-light border-0" : "bg-white text-dark border";
  const borderClass = theme === "dark" ? "border-light" : "border-dark";

  return (
    <div className={` p-5 ${bgClass}`}>
      <button
        className={`btn btn-outline-info mb-3 ${theme === "dark" ? "text-light border-light" : ""}`}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="fw-bold text-primary mb-4">Course Overview</h1>

      <div className="row">
        {/* Left Column */}
        <div className="col-lg-6 mb-4">
          <div className={`card p-3 shadow-sm ${cardClass}`}>
            <h3 className="fw-bold">{course.title}</h3>
            <p className="text-muted">{course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p>
              <strong>Price:</strong>{" "}
              <span className="text-success fw-bold">₹{course.price}</span>
            </p>
            <p><strong>Rating:</strong> ⭐{course.rating}</p>
            <p><strong>Videos:</strong> {lessons.length}</p>
          </div>

          <h5 className="mt-4">Lessons</h5>
          <div className="d-flex flex-wrap">
            {lessons.map((l, i) => (
              <div
                key={l.id || i}
                className="m-2 position-relative"
                style={{
                  width: 250,
                  height: 150,
                  backgroundImage: `url(http://localhost:8080/E-learning/${course.thumbnail.replace('../', '')})`,
                  backgroundSize: "cover",
                  borderRadius: 10,
                  border: theme === "dark" ? "2px solid #444" : "2px solid #ccc",
                }}
              >
                <div className="position-absolute top-50 start-50 translate-middle">
                  <PlayCircle size={40} color="white" />
                </div>
                <div
                  className="position-absolute bottom-0 w-100 bg-dark bg-opacity-50 text-white p-1 text-center"
                  style={{ fontSize: "0.85rem" }}
                >
                  {l.lesson_title}
                </div>
              </div>
            ))}
          </div>

          <div className={`card mt-4 p-3 shadow-sm ${cardClass}`}>
            <h5 className="fw-semibold mb-3">💬 Comments</h5>
            {comments.length === 0 ? (
              <p className="text-muted">No comments yet.</p>
            ) : (
              comments.map((c, i) => (
                <div
                  key={c.id || i}
                  className={`border rounded p-2 mb-2 ${theme === "dark" ? "bg-dark border-light text-light" : "bg-light border"}`}
                >
                  <strong>{c.user_name}</strong>
                  <p className="mb-0">{c.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column - Payment */}
        <div className="col-lg-6">
          <h3 className="fw-bold mb-3">Payment Options</h3>

          <div
            className={`list-group-item p-3 mb-3 rounded shadow-sm ${cardClass} ${borderClass}`}
            onClick={() => setShowForm(showForm === "card" ? "" : "card")}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold">Credit Card</span>
              <CreditCard />
            </div>
          </div>

          {showForm === "card" && (
            <form
              className={`rounded p-3 shadow-sm ${cardClass}`}
              onSubmit={handlePay}
            >
              <input
                className={`form-control mb-2 ${theme === "dark" ? "bg-dark text-light border-light" : ""}`}
                placeholder="Card Number"
                maxLength={19}
                value={form.number}
                onChange={(e) =>
                  setForm({
                    ...form,
                    number: e.target.value
                      .replace(/\D/g, "")
                      .replace(/(.{4})/g, "$1-")
                      .slice(0, 19),
                  })
                }
              />
              {errors.number && <small className="text-danger">{errors.number}</small>}

              <div className="d-flex gap-2 mb-2">
                <input
                  className={`form-control ${theme === "dark" ? "bg-dark text-light border-light" : ""}`}
                  placeholder="MM/YY"
                  maxLength={5}
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                />
                <input
                  className={`form-control ${theme === "dark" ? "bg-dark text-light border-light" : ""}`}
                  placeholder="CVV"
                  maxLength={3}
                  value={form.cvv}
                  onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                />
              </div>
              {errors.expiry && <small className="text-danger d-block">{errors.expiry}</small>}
              {errors.cvv && <small className="text-danger d-block">{errors.cvv}</small>}

              <input
                className={`form-control mb-2 ${theme === "dark" ? "bg-dark text-light border-light" : ""}`}
                placeholder="Card Holder Name"
                value={form.holder}
                onChange={(e) => setForm({ ...form, holder: e.target.value })}
              />
              {errors.holder && <small className="text-danger">{errors.holder}</small>}

              <button className="btn btn-success w-100 mt-2" type="submit">
                Pay Now
              </button>
            </form>
          )}

          <div
            className={`list-group-item p-3 mt-3 rounded shadow-sm ${cardClass}`}
            onClick={() => setShowForm(showForm === "upi" ? "" : "upi")}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold">UPI</span>
              <QrCode />
            </div>
          </div>

          {showForm === "upi" && (
            <div className={`rounded p-3 shadow-sm text-center ${cardClass}`}>
              <p className="text-primary fw-semibold">
                UPI function not active, use Card instead.
              </p>
              <img src="/assets/qr.png" alt="QR" width="150" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
