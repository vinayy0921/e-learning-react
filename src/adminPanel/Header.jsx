import React from 'react'
import { BookOpen } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const {user} = props || {user: "Admin"};
    const navigate = useNavigate();

    const handleLogout = () => {
        props.logout();
        navigate('/');
        // console.log("User logged out");
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top">
        <div className="container-fluid">
          <div className="navbar-brand d-flex align-items-center">
            <BookOpen size={24} color="#030213" className="me-2" />
            <span className="h5 mb-0 fw-semibold">LearnHub Admin</span>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            
            <div className="d-flex align-items-center gap-2">
              <div
                className="bg-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px' }}
              >
                <span className="text-white small">{user.charAt(0)}</span>
              </div>
              <span className="small">{user}</span>
              <button className="btn btn-link btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
