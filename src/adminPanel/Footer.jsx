import React from "react";
import { useTheme } from "../context/ThemeContext";

const AdminFooter = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`footer mt-auto py-3 border-top ${
        theme === "dark" ? "bg-dark text-light border-secondary" : "bg-light text-muted border-light"
      }`}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
        <p className="mb-2 mb-md-0 small">
          © {new Date().getFullYear()} <strong>LearnHub Admin</strong>. All rights reserved.
        </p>

        <div className="d-flex align-items-center gap-3">
          <a
            href="/privacy"
            className={`small text-decoration-none ${
              theme === "dark" ? "text-light" : "text-secondary"
            }`}
          >
            Privacy Policy
          </a>
          <a
            href="/t&c"
            className={`small text-decoration-none ${
              theme === "dark" ? "text-light" : "text-secondary"
            }`}
          >
            Terms of Use
          </a>
          <a
            href="mailto:support@learnhub.com"
            className={`small text-decoration-none ${
              theme === "dark" ? "text-light" : "text-secondary"
            }`}
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
