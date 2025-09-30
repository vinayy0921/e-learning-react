📚 E-Learning-React

A modern E-Learning platform built with React for the frontend and PHP + MySQL API as backend.
This project supports multi-role authentication (Admin, Student), course management, and interactive dashboards.

🚀 Features

🔐 Authentication System (Student & Admin)

🧑‍🎓 Student Dashboard – Browse & purchase courses

🧑‍🏫 Admin Dashboard – Verify & manage courses

📖 Profile Management – Update user info with persistence via localStorage

⚡ React Router – Smooth navigation without reloads

🎨 Lucide Icons + Bootstrap UI for clean and modern design

🌐 Axios for API integration

💾 LocalStorage-based session handling (auto login after refresh)

🛠️ Installation
Backend (PHP API)

Place the e-api folder inside your XAMPP/WAMP htdocs directory.

htdocs/
  └── e-api/


Import the database (if provided) into phpMyAdmin.

Update database credentials inside connection.php.

Frontend (React)

Clone this repository or copy the code into a folder:

git clone https://github.com/yourusername/e-learningreact.git
cd e-learningreact


Install dependencies:

npm install
npm i react-router-dom lucide-react axios


Update API URL:

By default, API calls point to http://localhost:8080/e-api/

Change it to match your local server, e.g. http://localhost/e-api/

Start development server:

npm start

📂 Folder Structure
e-learning-react/
│── src/
│   ├── components/    # Reusable UI components (Navbar, Sidebar, etc.)
│   ├── context/       # AuthContext (localStorage + login/logout handling)
│   ├── pages/         # Dashboard, Profile, Login, Register
│   ├── App.js         # Main app with routes
│   └── index.js       # Entry point
│
└── e-api/             # PHP backend API (place in htdocs)

⚡ Usage

Login using credentials stored in database.

On successful login:

Students → redirected to /user/dashboard

Admins → redirected to /admin/dashboard

User stays logged in even after refreshing (thanks to localStorage).

Logout clears the session and redirects to login.

🔧 Available Scripts

In the frontend project directory, you can run:

npm start

Runs the app in development mode at http://localhost:3000
.

npm run build

Builds the app for production in the build/ folder.

npm test

Runs the test runner in interactive watch mode.

📌 Tech Stack

Frontend: React, React Router, Axios, Lucide-React, Bootstrap

Backend: PHP (API), MySQL (Database)

State Management: React Context + LocalStorage

📜 Notes

Make sure your PHP server (XAMPP/WAMP) is running.

Change API endpoints if your backend runs on a different port/path.

Use npm run build before deploying React app to production.

✨ Now you have a fully working E-LearningReact setup with documentation.