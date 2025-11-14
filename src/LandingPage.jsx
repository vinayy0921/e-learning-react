import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, Star, Play, CheckCircle, Shield } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top">
                <div className="container">
                    <div className="navbar-brand d-flex align-items-center">
                        <BookOpen className="me-2" size={32} color="#030213" />
                        <span className="h4 mb-0 fw-semibold">LearnHub</span>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn btn-outline-primary"
                          onClick={() => navigate('./auth/register')}
                        >
                            Register
                        </button>
                        <button
                            className="btn btn-primary"
                          onClick={() => navigate('./auth/login')}
                        >
                            Login
                        </button>
                        
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-5" style={{ background: 'linear-gradient(135deg, rgba(3, 2, 19, 0.05) 0%, rgba(3, 2, 19, 0.1) 100%)' }}>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-3 fw-bold mb-4">
                                Learn Without Limits
                            </h1>
                            <p className="lead text-muted mb-4">
                                Access thousands of courses taught by expert instructors.
                                Start learning today and advance your career.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                                <button
                                    className="btn btn-primary btn-lg"
                                  onClick={() => navigate('./auth/register')}
                                >
                                    Get Started Free
                                </button>
                                <button className="btn btn-outline-primary btn-lg">
                                    <Play size={16} className="me-2" />
                                    Watch Demo
                                </button>
                            </div>

                        </div>

                        <div className="col-lg-6 text-end">
                            <img
                                src="/uploads/others/image.png"
                                alt="Students learning together"
                                className="img-fluid rounded shadow-lg"
                                style={{ maxWidth: '500px' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-6 col-lg-3 mb-4">
                            <h3 className="fw-bold">10K+</h3>
                            <p className="text-muted">Students</p>
                        </div>
                        <div className="col-6 col-lg-3 mb-4">
                            <h3 className="fw-bold">500+</h3>
                            <p className="text-muted">Courses</p>
                        </div>
                        <div className="col-6 col-lg-3 mb-4">
                            <h3 className="fw-bold">50+</h3>
                            <p className="text-muted">Expert Instructors</p>
                        </div>
                        <div className="col-6 col-lg-3 mb-4">
                            <h3 className="fw-bold">95%</h3>
                            <p className="text-muted">Completion Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">Why Choose LearnHub?</h2>
                        <p className="lead text-muted">
                            Our platform offers everything you need to succeed in your learning journey
                        </p>
                    </div>

                    <div className="row">
                        {[
                            { icon: BookOpen, title: 'Expert-Led Courses', desc: 'Learn from industry professionals with years of experience' },
                            { icon: Users, title: 'Community Support', desc: 'Connect with fellow learners and get help when you need it' },
                            { icon: Award, title: 'Certificates', desc: 'Earn verified certificates upon course completion' },
                            { icon: Star, title: 'Quality Content', desc: 'All courses are reviewed and approved by our expert team' },
                            { icon: CheckCircle, title: 'Flexible Learning', desc: 'Learn at your own pace with lifetime access to courses' },
                            { icon: Play, title: 'Interactive Learning', desc: 'Engage with quizzes, assignments, and practical projects' }
                        ].map((feature, index) => (
                            <div key={index} className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 shadow-sm border-0 hover-shadow">
                                    <div className="card-body p-4">
                                        <div
                                            className="d-flex align-items-center justify-content-center mb-3 rounded"
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                backgroundColor: 'rgba(3, 2, 19, 0.1)'
                                            }}
                                        >
                                            <feature.icon size={24} color="#030213" />
                                        </div>
                                        <h5 className="card-title mb-3">{feature.title}</h5>
                                        <p className="card-text text-muted">{feature.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5 text-white" style={{ backgroundColor: '#030213' }}>
                <div className="container text-center">
                    <h2 className="display-5 fw-bold mb-3">Ready to Start Learning?</h2>
                    <p className="lead mb-4" style={{ opacity: 0.9 }}>
                        Join thousands of students and start your learning journey today
                    </p>
                    <button
                        className="btn btn-light btn-lg"
                    onClick={() => navigate('./auth/register')}
                    >
                        Get Started Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-light border-top py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mb-4">
                            <div className="d-flex align-items-center mb-3">
                                <BookOpen size={24} color="#030213" className="me-2" />
                                <span className="h5 mb-0 fw-semibold">LearnHub</span>
                            </div>
                            <p className="text-muted">
                                Empowering learners worldwide with quality education and expert instruction.
                            </p>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className="mb-3">Platform</h6>
                            <ul className="list-unstyled">
                                <li><a href="/" className="text-muted text-decoration-none">About Us</a></li>
                                <li><a href="/" className="text-muted text-decoration-none">How it Works</a></li>
                                <li><a href="/" className="text-muted text-decoration-none">Careers</a></li>
                                <li><a href="/" className="text-muted text-decoration-none">Blog</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className="mb-3">Support</h6>
                            <ul className="list-unstyled">
                                <li><a href="/" className="text-muted text-decoration-none">Help Center</a></li>
                                <li><a href="/" className="text-muted text-decoration-none">Contact Us</a></li>
                                <li><a href="/" className="text-muted text-decoration-none">Community</a></li>
                                <li><a href="/" className="text-muted text-decoration-none">Status</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className="mb-3">Legal</h6>
                            <ul className="list-unstyled">
                                <li><a href="/" className="text-muted text-decoration-none">Terms of Service</a></li>
                                <li><a href="/" className="text-muted text-decoration-none">Privacy Policy</a></li>
                                <li><a href="/" className="text-muted text-decoration-none">Cookie Policy</a></li>
                                <li><a href="/" className="text-muted text-decoration-none">GDPR</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-top pt-4 mt-4 text-center">
                        <p className="text-muted mb-0">&copy; 2024 LearnHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;