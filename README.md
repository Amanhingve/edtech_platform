# EdTech Platform

## 📌 Project Overview
This is a full-stack web application designed for an **EdTech platform** that helps students track applications, find matching scholarships, and receive AI-based profile matching.

## 🚀 Features
- **Student Dashboard** – View applications, scholarships, and profile details.
- **Agent Dashboard** – Manage student applications.
- **Admin Dashboard** – Manage users, applications, and scholarships.
- **Scholarship Finder** – AI-powered scholarship recommendations.
- **Profile Matching** – AI-based matching system for personalized opportunities.
- **Authentication** – Secure JWT-based authentication with role-based access control.

## 🛠️ Tech Stack
### **Frontend:**
- React.js
- Tailwind CSS
- Axios
- React Router

### **Backend:**
- Node.js & Express.js
- MySQL (Sequelize ORM)
- JWT Authentication
- bcrypt.js for password hashing
- dotenv for environment variables

## 📂 Folder Structure
```
/edtech_platform
│── frontend/        # React.js Frontend
│── backend/         # Node.js Backend
│── database/        # MySQL Database Schema
│── .env             # Environment Variables
│── README.md        # Project Documentation
```

## 🔧 Installation
### **1. Clone the Repository**
```sh
git clone https://github.com/yourusername/edtech_platform.git
cd edtech_platform
```
### **2. Backend Setup**
```sh
cd backend
npm install
cp .env.example .env # Configure environment variables
npm start
```
### **3. Frontend Setup**
```sh
cd frontend
npm install
npm start
```

## 🔑 Environment Variables
Create a `.env` file in the **backend/** folder and set the following variables:
```
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=edtech_platform
JWT_SECRET=your_secret_key
```

## 📡 API Endpoints
### **Authentication**
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive a token
- `GET /api/auth/profile` – Get user profile (Requires token)

### **Scholarships**
- `GET /api/scholarships/match` – Get matching scholarships

### **Applications**
- `POST /api/applications` – Submit a new application
- `GET /api/applications` – View all applications

## 🐳 Docker Setup (Optional)
If you want to run the project using **Docker**, follow these steps:
```sh
docker-compose up --build
```

## ❗ Troubleshooting
### **1. MySQL Connection Refused**
If you see an error like:
```
Database connection failed: Error: connect ECONNREFUSED 127.0.0.1:3306
```
- Make sure MySQL is running
- Check `.env` file for correct credentials

### **2. `react-scripts: Permission Denied` Error**
Run the following command in **frontend/**:
```sh
chmod +x node_modules/.bin/react-scripts
```

## 📜 License
This project is **open-source** under the MIT License.

