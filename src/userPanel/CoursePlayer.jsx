import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API = "http://localhost:8080/e-api/";

export default function CoursePlayer() {
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [comments, setComments] = useState([]);
    const [activeLesson, setActiveLesson] = useState(null);
    const [newComment, setNewComment] = useState("");
    const { courseId, userId } = useParams();
    // console.log(courseId, userId);
    const navigate = useNavigate();



    useEffect(() => {
        async function fetchData() {
            try {
                const courseRes = await axios.get(`${API}CourseData.php?id=${courseId}`);
                const lessonsRes = await axios.get(`${API}getLessons.php?course_id=${courseId}`);
                const commentsRes = await axios.get(`${API}getComment.php?course_id=${courseId}`);

                setCourse(courseRes.data);
                setLessons(lessonsRes.data);
                setComments(commentsRes.data);
                setActiveLesson(lessonsRes.data[0] || null);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [courseId]);

    const handleLessonClick = (lesson) => setActiveLesson(lesson);

    const postComment = async () => {
        if (!newComment) return;
        try {
            await axios.post(`${API}addComment.php`, { courseId, comment: newComment });
            setComments([{ user_name: "You", comment: newComment }, ...comments]);
            setNewComment("");
        } catch (err) {
            console.error(err);
        }
    };

    const markCompleted = async () => {
        try {
            await axios.post(`${API}markCompleted.php`, { courseId, userId });
            alert("Course marked as completed!");
            navigate('/user/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    if (!course || !userId) return <p className="text-center mt-5">Loading course...</p>;

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top">
                <div className="container">
                    <Link to="/user/dashboard" style={{ textDecoration: 'none' }}>&larr; Back</Link>
                    <div className="navbar-brand d-flex align-items-center">
                        <BookOpen className="me-2" size={32} color="#030213" />
                        <span className="h4 mb-0 fw-semibold">LearnHub</span>
                    </div>
                </div>
            </nav>
            <div className="container py-5">
                <h1 className="fw-bold text-primary mb-2">{course.title}</h1>
                <p className="text-muted mb-4">Instructor: {course.instructor}</p>

                <div className="row g-4">
                    {/* Video + Transcript */}
                    <div className="col-lg-8">
                        <div className="position-relative rounded overflow-hidden mb-4 shadow-sm">
                            {activeLesson && (
                                <>
                                    <video
                                        key={activeLesson.id}
                                        className="w-100 rounded"
                                        controls
                                        src={`http://localhost:8080/E-learning/${activeLesson.video_path.replace('../', '')}`}
                                        height={'400px'}
                                    />
                                    {/* <div className="position-absolute top-50 start-50 translate-middle">
                  <PlayCircle size={60} color="white" className="play-overlay" />
                </div> */}
                                </>
                            )}
                        </div>

                        {/* Tabs for Transcript / Resources */}
                        <ul className="nav nav-tabs mb-3">
                            <li className="nav-item">
                                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#transcript">
                                    Transcript
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#resources">
                                    Resources
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content mb-4">
                            <div className="tab-pane fade show active" id="transcript">
                                <div className="card p-3 shadow-sm">
                                    <p>{activeLesson?.transcript || "No transcript available."}</p>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="resources">
                                <div className="card p-3 shadow-sm">
                                    <p>No resources available.</p>
                                </div>
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="card p-3 shadow-sm">
                            <h5 className="mb-3">💬 Comments</h5>
                            <div className="mb-3">
                                <textarea
                                    className="form-control mb-2"
                                    rows={2}
                                    placeholder="Write a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button className="btn btn-primary btn-sm" onClick={postComment}>
                                    Post Comment
                                </button>
                            </div>
                            {comments.map((c, idx) => (
                                <div key={idx} className="border rounded p-2 mb-2 bg-light">
                                    <strong>{c.user_name}</strong>
                                    <p className="mb-0">{c.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lessons Sidebar */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm mb-3">
                            <div className="card-header">
                                <h6 className="mb-0">Lessons</h6>
                            </div>
                            <div className="list-group list-group-flush">
                                {lessons.map((lesson, idx) => (
                                    <button
                                        key={lesson.id || idx}
                                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${activeLesson?.id === lesson.id ? "active" : ""
                                            }`}
                                        onClick={() => handleLessonClick(lesson)}
                                    >
                                        <span>{idx + 1}. {lesson.lesson_title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="btn btn-success w-100 mb-3" onClick={markCompleted}>
                            Mark as Completed
                        </button>
                    </div>
                </div>


                <style>{`
        .play-overlay {
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .play-overlay:hover {
          opacity: 1;
        }
        .list-group-item {
          padding: 0.75rem 1rem;
          transition: background 0.2s;
        }
        .list-group-item:hover {
          background: #f1f5f9;
        }
        .list-group-item.active {
          background-color: #0d6efd;
          color: white;
          font-weight: bold;
        }
      `}</style>
            </div>
        </>
    );
}
