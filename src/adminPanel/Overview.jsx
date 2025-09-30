import React, { useState, useEffect } from 'react'
import '../styles/AdminDash.css'

const API = "http://localhost:8080/e-api/";

export default function Overview() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API}adminDashboard.php`)
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            });

        const fadeElems = document.querySelectorAll(".fade-scroll");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("visible");
                });
            },
            { threshold: 0.2 }
        );
        fadeElems.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [loading]);



    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="container-fluid mt-4">
            {/* === Stats Cards === */}
            <div className="row mb-4">
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon="fa-solid fa-users"
                    color="primary"
                />
                <StatCard
                    title="Total Courses"
                    value={stats.totalCourses}
                    icon="fa-solid fa-book-open"
                    color="info"
                />
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue || 0}`}
                    icon="fa-solid fa-indian-rupee-sign"
                    color="success"
                />
            </div>

            {/* === Enrolled Courses + Platform Health === */}
            <div className="row">
                <div className="col-lg-8 mb-4 fade-scroll">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h6 className="mb-0">Enrolled Courses</h6>
                        </div>
                        <div className="card-body">
                            {stats.enrolled.length === 0 && <p>No enrollments yet.</p>}
                            {stats.enrolled.map((row, i) => (
                                <div
                                    key={i}
                                    className="d-flex justify-content-between align-items-center p-2 rounded mb-2 course-row"
                                >
                                    <div>
                                        <p className="fw-medium mb-0 small">{row.title}</p>
                                        <small className="text-muted">by {row.instructor}</small>
                                    </div>
                                    <div className="d-flex flex-column text-end">
                                        <small>{row.student_name}</small>
                                        <small className="text-muted">{row.enrolled_at}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 mb-4 fade-scroll">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h6 className="mb-0">Platform Health</h6>
                        </div>
                        <div className="card-body">
                            {["Server Status", "Database", "Payment Gateway", "CDN"].map(
                                (item, i) => (
                                    <div
                                        key={i}
                                        className="d-flex justify-content-between mb-3"
                                    >
                                        <span className="small">{item}</span>
                                        <span className="badge bg-success">Healthy</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ✅ Reusable Stats Card
function StatCard({ title, value, icon, color }) {
    return (
        <div className="col-md-6 col-lg-4 mb-3 fade-scroll">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <p className="text-muted small mb-1">{title}</p>
                        <h4 className="mb-0">{value}</h4>
                        <p className="text-success small mb-0">
                            <i className="fa-solid fa-arrow-trend-up me-1"></i>
                            +10% this month
                        </p>
                    </div>
                    <i className={`${icon} text-${color}`} style={{ fontSize: "32px" }}></i>
                </div>
            </div>
        </div>
    );
}