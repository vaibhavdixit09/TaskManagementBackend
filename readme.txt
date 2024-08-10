TaskMaster Pro

TaskMaster Pro is an advanced task management system designed to help users manage both their office and personal tasks seamlessly. This project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and features Google OAuth authentication for secure and streamlined access.

Features : Google Authentication: Secure login with Google OAuth using Passport.js. Task Management: Manage office and personal tasks with ease. Task Categorization: Categorize tasks by type (office or personal). Due Dates: Set and track task deadlines. Automated Reminders: Receive automated task reminders via cron jobs. User Sessions: Maintain user sessions securely with express-session. Responsive Design: User-friendly and responsive interface built with React. Technologies Used Frontend: React.js Backend: Node.js, Express.js Database: MongoDB Authentication: Passport.js (Google OAuth) Session Management: express-session Task Scheduling: cron

Getting Started : Prerequisites Make sure you have the following installed on your system: Node.js (v14.x or later) MongoDB (local or cloud) npm (Node package manager) Google Developer Account (for OAuth setup)

API Endpoints

**Authentication**
      POST /api/v1/auth/google: Start Google OAuth authentication.
**Tasks**
      GET /api/v1/tasks: Get all tasks for the logged-in user.
      POST /api/v1/tasks: Create a new task.
      PUT /api/v1/tasks/:id: Update an existing task.
      DELETE /api/v1/tasks/:id: Delete a task.
Installation Clone the Repository: Clone the repository using Git and navigate into the project directory: git clone https://github.com/yourusername/taskmaster-pro.git cd taskmaster-pro

Backend Setup: Navigate to the backend directory:

     cd backend
     Install the necessary packages:
     
     Run npm install to install all dependencies.
     Create a .env file in the backend directory and configure the following environment variables:
     
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     SESSION_SECRET=your_session_secret
     Start the backend server:
     
     Run npm start to start the backend server.
Frontend Setup: Navigate to the frontend directory:

      cd ../frontend
      Install the necessary packages:

      Run npm install to install all dependencies.
      Create a .env file in the frontend directory and add the following:
      
      REACT_APP_API_URL=http://localhost:5000/api/v1
      REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
      Start the React development server:
      
      Run npm start to start the frontend server.
