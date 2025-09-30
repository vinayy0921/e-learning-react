import React, { useState, useEffect } from 'react';

const API = "http://localhost:8080/e-api/";

const CompletedCourse = ({ id: userId }) => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API}completedCourses.php?userId=${userId}`);
        const data = await response.json();
        // console.log("Fetched completed courses:", data);
        setCompletedCourses(data);
      } catch (error) {
        console.error("Error fetching completed courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchCompletedCourses();
    }
  }, [userId]);

  if (isLoading) {
    return (
      <>
        <h2 className="mb-4" id="my-courses">Completed Courses</h2>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="my-5">
      <h2 className="mb-4" id="my-courses">Completed Courses</h2>
      {completedCourses.length === 0 ? (
        <div className="card mb-4">
          <div className="card-body text-center py-5">
            <i className="bi bi-book-half fs-1 text-muted mb-3"></i>
            <p className="text-muted">No completed courses yet</p>
            <a href="#browse-courses" className="btn btn-primary mt-3">
              Browse Courses
            </a>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            {completedCourses.map((course, index) => (
              <div key={course.id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark mb-2">
                      <i className="bi bi-book-fill text-primary me-2"></i>
                      {course.title}
                    </h5>

                    <p className="card-text text-muted flex-grow-1">
                      {course.description}
                    </p>

                    <p className="small text-secondary mb-3">
                      <i className="bi bi-calendar-event me-1"></i>
                      Completed on (
                      {course.completed_at
                        ? new Date(course.completed_at.replace(" ", "T")).toLocaleDateString()
                        : "Unknown"}
                      )
                    </p>

                    <a href="/" className="btn btn-success btn-sm w-100 mt-auto">
                      <i className="bi bi-award me-1"></i>
                      Download Certificate
                    </a>
                  </div>
                </div>
              </div>
            )
            )}

          </div>
        </div>


      )}
    </div>
  );
};

export default CompletedCourse;
