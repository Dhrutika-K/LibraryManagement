# LibraryManagement
# Library Management System

A comprehensive Library Management System built using React, Redux, Node.js, and MongoDB. This application allows administrators to manage books and users to search for, issue, and return books.

## Features

- User authentication and authorization
- Book search and filtering
- Issue and return books
- Add, update, and delete books and students (Admin)
- Review and rate books 
- Responsive design

## Technologies

- Frontend:
  - React
  - Redux
  - Material-UI
- Backend:
  - Node.js
  - Express.js
  - MongoDB
- Other:
  - Axios
  - JWT (JSON Web Tokens) for authentication
  -Razorpay
  
## Installation

### Prerequisites

- Node.js (>=14.x)
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/yourusername/library-management-system.git
cd library-management-system

###Install Dependencies 
For Backend
cd backend
npm install

For Frontend
cd frontend
npm install

###Environment Variables
Create a .env file in the backend directory and add the following environment variables:
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_cluster_url

###Run the Application
Start Backend Server
cd backend
node server.js

Start Frontend Server
cd ../frontend
npm start
