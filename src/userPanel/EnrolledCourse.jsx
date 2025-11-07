import React, { useState, useEffect } from 'react'
import { BookOpen, Star, Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const API = "http://localhost:8080/e-api/";

const EnrolledCourse = (props) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const userId = props.id;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API}enrollededCourses.php?userId=${userId}`);
        const data = await response.json();
        setEnrolledCourses(data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
    
  }, [userId]);
  const handleContinue = (courseId) => {
    navigate(`/user/coursePlayer/${courseId }/${userId}`);
  }

  if (isLoading) {
    return (
      <>
      <h2 className="mb-4" id='my-courses'>My Courses</h2>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      </>
    )
  }

  return (
    <div>
      <h2 className="mb-4" id='my-courses'>My Courses</h2>
      {enrolledCourses.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <BookOpen size={48} className="text-muted mb-3" />
            <p className="text-muted">No courses enrolled yet</p>
            <button
              className="btn btn-primary mt-3"
            >
              Browse Courses
            </button>
          </div>
        </div>
      ) : (
        <div className="container-fluid row">
          {enrolledCourses.map(course => (
            <div key={course.id} className="col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm hover-shadow">
                <img
                  src={`http://localhost:8080/E-learning/${course.thumbnail.replace('../', '')}`}
                  alt={course.title}
                  className="card-img-top"
                  style={{ height: '170px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <span
                    className="badge bg-primary align-self-start"
                    style={{ top: '8px', right: '8px' }}
                  >
                    {course.category}
                  </span>
                  <h5 className="card-title mt-2">{course.title}</h5>
                  <p className="text-muted small">by {course.instructor}</p>

                  <div className="d-flex align-items-center gap-3 mt-auto small text-muted">
                    <div className="d-flex align-items-center">
                      <Star size={16} className="text-warning me-1" fill="currentColor" />
                      {course.rating}
                    </div>
                    <div className="d-flex align-items-center">
                      <Clock size={16} className="me-1" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="h5 mb-0">₹{course.price}</span>
                    <button className="btn btn-primary btn-sm" onClick={() => {handleContinue(course.id)}}>
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourse;
