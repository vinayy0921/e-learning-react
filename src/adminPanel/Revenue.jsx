import React, { useEffect, useState } from "react";
import "../styles/Revenue.css";

const API = "http://localhost:8080/e-api/revenueStat.php";

export default function Revenue() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    thisMonthRevenue: 0,
    platformFee: 0,
    categoryRevenue: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ Smooth fade-in scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Add delay for staggered animation
            entry.target.style.transitionDelay = `${i * 0.05}s`;
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".fade-slide").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [stats]);

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Revenue Analytics</h4>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Revenue Cards */}
          <div className="row mb-4">
            <RevenueCard
              title="Total Revenue"
              value={`₹ ${stats.totalRevenue.toLocaleString()}`}
            />
            <RevenueCard
              title="This Month"
              value={`₹ ${stats.thisMonthRevenue.toLocaleString()}`}
            />
            <RevenueCard
              title="Platform Fee"
              value={`₹ ${stats.platformFee.toLocaleString()}`}
            />
          </div>

          {/* Category Revenue */}
          <div className="card fade-slide">
            <div className="card-header">
              <h6 className="card-title mb-0">Revenue by Course Category</h6>
            </div>
            <div className="card-body">
              {stats.categoryRevenue.length === 0 ? (
                <p className="text-muted">No category revenue data available.</p>
              ) : (
                stats.categoryRevenue.map((cat, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center mb-3 category-item fade-slide"
                  >
                    <span>{cat.category}</span>
                    <span>₹ {Number(cat.revenue).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function RevenueCard({ title, value }) {
  return (
    <div className="col-md-6 col-lg-4 mb-3 fade-slide">
      <div className="card text-center">
        <div className="card-body">
          <p className="text-muted small mb-1">{title}</p>
          <h4 className="mb-0">{value}</h4>
        </div>
      </div>
    </div>
  );
}
