import React, { useState, useEffect } from "react";
import { Search, SortAsc, Star, Clock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8080/e-api/";

const BrowseCourse = (props) => {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API + "getCourses.php");
            // console.log(res.data);
            setCourses(res.data);
        } catch (err) {
            console.error("Error fetching courses:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEnroll = (courseId) =>{
       navigate(`/user/enroll/${courseId}/${props.userId}`);
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Discover Courses</h2>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="position-relative mx-3">
                        <Search
                            size={16}
                            className="position-absolute text-muted"
                            style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search courses..."
                            style={{ paddingLeft: "40px", maxWidth: "300px" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-outline-secondary d-flex align-items-center">
                        <SortAsc size={16} className="me-2" />
                        Sort
                    </button>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    {loading ? (                             
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) :
                        filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <div key={course.id} className="col-md-4 col-lg-3 mb-4">
                                    <div className="card h-100 shadow-sm hover-shadow">
                                        <div style={{ position: "relative", paddingBottom: "56.25%", overflow: "hidden" }}>
                                            <img
                                                src={`http://localhost:8080/E-learning/${course.thumbnail.replace('../', '')}`}
                                                alt={course.title}
                                                className="card-img-top"
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <span
                                                className="badge bg-primary position-absolute"
                                                style={{ top: "8px", right: "8px" }}
                                            >
                                                {course.category}
                                            </span>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">{course.title}</h5>
                                            <p className="text-muted small">by {course.instructor}</p>

                                            <div className="d-flex flex-wrap align-items-center gap-3 mb-3 small text-muted">
                                                <div className="d-flex align-items-center">
                                                    <Star size={16} className="text-warning me-1" fill="currentColor" />
                                                    {course.rating}
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Clock size={16} className="me-1" />
                                                    {course.duration}
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="h5 mb-0">₹{course.price}</span>
                                                <button className="btn btn-primary btn-sm"  onClick={() => handleEnroll(course.id)}>Enroll</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="fw-fold text-center mt-5">No courses found.</p>
                        )}
                </div>
            </div>
        </div>
    );
};

export default BrowseCourse;
