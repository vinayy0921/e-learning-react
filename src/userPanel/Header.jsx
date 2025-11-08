import React from 'react'
import { BookOpen } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

export default function Header(props) {
   const { theme, toggleTheme } = useTheme(); // ✅ theme control
  
  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top px-2">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <div className="navbar-brand d-flex align-items-center me-4">
              <BookOpen size={24} color={theme === "dark" ? "#f8f9fa" : "#030213"} className="me-2" />
              <span className="h5 mb-0 fw-semibold">LearnHub</span>
            </div>
            
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link p-1">
            </button>
            <div className="d-flex align-items-center gap-2">
              <div
                className="bg-secondary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px' }}
              >
                <span className="text-white small">{props.name.charAt(0)}</span>
              </div>
              <span className="small">{props.name}</span>
             
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
