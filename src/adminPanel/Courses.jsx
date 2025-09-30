import React, { useEffect, useState } from "react";
import '../styles/AdminDash.css'

const API = "http://localhost:8080/e-api/";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Fetch courses
    useEffect(() => {
        fetch(`${API}fetchAllCourses.php`)
            .then((r) => r.json())
            .then((data) => {
                if (data.success && Array.isArray(data.courses)) {
                    setCourses(data.courses);
                } else {
                    setCourses([]);
                }
                setLoading(false);
            })
            .catch(() => setCourses([]));
    }, []);


    // Animate cards on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        document.querySelectorAll(".course-card").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [courses]);

    const toggleActive = async (id) => {
        try {
            const formData = new FormData();
            formData.append("courseId", id);

            const res = await fetch("http://localhost:8080/e-api/toggleCourse.php", {
                method: "POST",
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                setCourses(prev =>
                    prev.map(c => c.id === id ? { ...c, is_active: data.is_active } : c)
                );
            } else {
                alert(data.message || "Failed to toggle course");
            }
        } catch (err) {
            console.error(err);
            alert("Error toggling course");
        }
    };


    const deleteCourse = async (id) => {
        if (!window.confirm("Delete this course?")) return;

        try {
            const res = await fetch("http://localhost:8080/e-api/deleteCourse.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `courseId=${id}`
            });
            const data = await res.json();

            if (data.success) {
                setCourses(prev => prev.filter(c => c.id !== id));
                alert("Course deleted successfully");
            } else {
                alert("Failed to delete course");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting course");
        }
    };


    const openComments = async (course) => {
        setSelectedCourse(course);
        setCommentsLoading(true);
        setComments([]);

        const modal = new window.bootstrap.Modal(document.getElementById("commentsModal"));
        modal.show();

        try {
            const res = await fetch(`http://localhost:8080/e-api/fetchComments.php?courseId=${course.id}`);
            const data = await res.json(); // <- parse JSON from PHP
            setComments(data);
        } catch (err) {
            console.error(err);
            setComments([]);
        } finally {
            setCommentsLoading(false);
        }
    };


    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Courses (Total: {courses.length})</h4>
                <a href="/admin/create-course" className="btn btn-dark">
                    <i className="fa-solid fa-plus me-2"></i>Create New Course
                </a>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : courses.length === 0 ? (
                <div className="alert alert-info">No courses found.</div>
            ) : (
                <div className="row">
                    {courses.map((c, i) => (
                        <div key={c.id || i} className="col-12 mb-3">
                            <div className="card course-card border rounded-3 p-3 bg-light">
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div className="d-flex gap-4 flex-wrap">
                                        <img
                                            src={c.thumbnail}
                                            alt="course"
                                            className="border rounded-3"
                                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                        />
                                        <div className="d-flex flex-wrap gap-4">
                                            <Info label="Title" value={c.title} />
                                            <Info label="Instructor" value={c.instructor} />
                                            <Info label="Category" value={c.category} />
                                            <Info label="Price" value={`₹${c.price}`} />
                                            <Info label="Created" value={c.created_at} />
                                            <Info label="Status" value={c.is_active ? "Active" : "Inactive"} />
                                            <Info label="Enrolled" value={c.total_enrolled} />
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2 mt-3 ">
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => openComments(c)}
                                        >
                                            <i className="fa-solid fa-comment-dots me-1"></i>Comments
                                        </button>
                                        <button
                                            className={`btn ${c.is_active ? "btn-outline-danger" : "btn-outline-success"
                                                }`}
                                            onClick={() => toggleActive(c.id)}
                                        >
                                            <i
                                                className={`fa-solid ${c.is_active ? "fa-ban" : "fa-check"
                                                    } me-1`}
                                            ></i>
                                            {c.is_active ? "Deactivate" : "Activate"}
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteCourse(c.id)}
                                        >
                                            <i className="fa-solid fa-trash-can me-1"></i>Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Comments Modal */}
            <div
                className="modal fade"
                id="commentsModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Comments {selectedCourse ? `- ${selectedCourse.title}` : ""}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {commentsLoading ? (
                                <p>Loading comments...</p>
                            ) : comments.length === 0 ? (
                                <p className="text-muted">No comments yet.</p>
                            ) : (
                                comments.map((cm, i) => (
                                    <div key={i} className="card mb-3 border rounded-3 bg-light">
                                        <div className="card-body">
                                            <h6 className="mb-1">{cm.user_name}</h6>
                                            <p className="mb-1">{cm.comment}</p>
                                            <small className="text-muted">{cm.created_at}</small>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Small reusable info block
function Info({ label, value }) {
    return (
        <div style={{ minWidth: "120px" }}>
            <span className="text-muted small d-block">{label}:</span>
            <p className="fw-semibold mb-0">{value}</p>
        </div>
    );
}
