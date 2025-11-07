import React, { useState } from "react";
import '../styles/createCourse.css'

const API = "http://localhost:8080/E-learning/admin/createCourseR.php";

export default function CreateCourse() {
  const [formData, setFormData] = useState({
    course_title: "",
    course_description: "",
    instructor: "",
    category: "",
    price: "",
    duration: "",
    lesson_count: 0,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = e => setFormData({...formData, [e.target.name]: e.target.value});
  const handleThumbnail = e => setThumbnail(e.target.files[0]);
  const handleLessonChange = (index, field, value) => {
    const newLessons = [...lessons];
    newLessons[index] = { ...newLessons[index], [field]: value };
    setLessons(newLessons);
  };
  const handleLessonFile = (index, file) => {
    const newLessons = [...lessons];
    newLessons[index] = { ...newLessons[index], video: file };
    setLessons(newLessons);
  };
  const handleLessonCount = e => {
    const count = parseInt(e.target.value);
    setFormData({...formData, lesson_count: count});
    setLessons(Array.from({length: count}, () => ({lesson_title: "", transcript: "", video: null})));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, val]) => fd.append(key, val));
    if (thumbnail) fd.append("thumbnail", thumbnail);
    lessons.forEach((l, i) => {
      fd.append(`lesson_title_${i+1}`, l.lesson_title);
      fd.append(`lesson_transcript_${i+1}`, l.transcript || "");
      if (l.video) fd.append(`lesson_video_${i+1}`, l.video);
    });

    try {
      const res = await fetch(API, { method: "POST", body: fd });
      const data = await res.json();
      alert(data.message);
      if (data.success) window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error(err);
      alert("Error creating course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Create New Course</h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-4">

          {/* LEFT COLUMN: Course Info */}
          <div className="col-lg-8">
            <div className="card card-surface p-4 shadow-sm">
              <h5 className="mb-3 text-primary"><i className="fa-solid fa-circle-info me-2"></i>Course Info</h5>

              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input type="text" className="form-control" name="course_title" value={formData.course_title} onChange={handleInput} placeholder="e.g., Mastering React" required />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea className="form-control" rows="4" name="course_description" value={formData.course_description} onChange={handleInput} placeholder="Brief overview…" required />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Instructor</label>
                  <input type="text" className="form-control" name="instructor" value={formData.instructor} onChange={handleInput} placeholder="Instructor full name" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <input type="text" className="form-control" name="category" value={formData.category} onChange={handleInput} placeholder="e.g., Web Development" required />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Duration</label>
                  <input type="text" className="form-control" name="duration" value={formData.duration} onChange={handleInput} placeholder="e.g., 6h 30m" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Price (₹)</label>
                  <input type="number" className="form-control" name="price" value={formData.price} onChange={handleInput} placeholder="e.g., 1499" min="0" required />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Thumbnail & Lessons */}
          <div className="col-lg-4">
            <div className="card card-surface p-4 shadow-sm mb-4">
              <h5 className="mb-3 text-primary"><i className="fa-solid fa-image me-2"></i>Thumbnail</h5>
              <input type="file" className="form-control" onChange={handleThumbnail} required />
              <small className="text-muted">Recommended: 1280×720, JPG/PNG, &lt; 1MB</small>
            </div>

            <div className="card card-surface p-4 shadow-sm">
              <h5 className="mb-3 text-primary"><i className="fa-solid fa-list-ol me-2"></i>Lessons</h5>
              <select className="form-select mb-2" onChange={handleLessonCount} required>
                <option value="">-- Select number of lessons --</option>
                <option value="1">1 Lesson</option>
                <option value="2">2 Lessons</option>
                <option value="3">3 Lessons</option>
              </select>
              <small className="text-muted">Up to 3 lessons in this version.</small>
            </div>
          </div>

          {/* Dynamic Lesson Cards */}
          <div className="col-12">
            {lessons.map((lesson, i) => (
              <div key={i} className="card p-3 mb-3 shadow-sm lesson-card">
                <h6 className="text-primary mb-3"><i className="fa-solid fa-book me-2"></i>Lesson {i+1}</h6>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={lesson.lesson_title} onChange={e => handleLessonChange(i, "lesson_title", e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Video</label>
                    <input type="file" className="form-control" accept="video/*" onChange={e => handleLessonFile(i, e.target.files[0])} required />
                  </div>
                </div>

                <div className="mb-2 mt-3">
                  <label className="form-label">Transcript (Optional)</label>
                  <textarea className="form-control" value={lesson.transcript} onChange={e => handleLessonChange(i, "transcript", e.target.value)} rows="2" />
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="col-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? "Creating..." : "Create & Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
