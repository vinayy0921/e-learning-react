import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // since you already have ThemeContext
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`footer pt-5 pb-3 ${
        theme === "dark"
          ? "bg-dark text-light"
          : "bg-light text-dark border-top"
      }`}
    >
      <div className="container">
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <h3 className="fw-bold mb-3 text-primary">LearnHub</h3>
            <p className="small text-muted">
              Learn anywhere, anytime. Transform your skills with expert-led
              courses and resources designed for your success.
            </p>
          </div>

          {/* Explore Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-uppercase mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link d-block mb-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/user/dashboard/browse" className="footer-link d-block mb-2">
                  Courses
                </Link>
              </li>
              <li>
              </li>
              <li>
                <Link to="/pricing" className="footer-link d-block mb-2">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-uppercase mb-3">Support</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/help" className="footer-link d-block mb-2">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link d-block mb-2">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link d-block mb-2">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link d-block mb-2">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold text-uppercase mb-3">Stay Connected</h6>
            <p className="small text-muted">
              Follow us on social media to stay updated with new courses and
              features.
            </p>
            <div className="d-flex align-items-center gap-3">
              <a href="/fb" className="social-link text-primary fs-5">
                <Facebook />
              </a>
              <a href="/tw" className="social-link text-primary fs-5">
                <Twitter />
              </a>
              <a href="/ig" className="social-link text-primary fs-5">
                <Instagram />
              </a>
              <a href="/lkd" className="social-link text-primary fs-5">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        <hr className={`my-4 ${theme === "dark" ? "border-light" : "border-dark"}`} />

        <div className="text-center small text-muted">
          &copy; {currentYear} <span className="fw-bold">LearnHub</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
