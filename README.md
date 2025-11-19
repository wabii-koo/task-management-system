Task Management System
A full-stack task management application built with Laravel backend and React frontend, featuring JWT authentication, CRUD operations, and role-based access control.

🚀 Features
Backend (Laravel API)
JWT Authentication (Register/Login/Logout)

RESTful API endpoints for tasks

Role-based Access Control (Admin/User)

Task filtering and sorting

Form validation using Laravel Requests

Eloquent ORM with relationships

Unit tests for authentication and tasks

Frontend (React)
Modern React with Vite

React Router for navigation

Context API for state management

Axios for API calls

Protected routes

Responsive design

Real-time task management

🛠️ Tech Stack
Backend:

Laravel 10+

PHP 8.1+

MySQL

JWT Authentication

PHPUnit for testing

Frontend:

React 18

Vite

React Router DOM

Axios

Tailwind CSS

📋 Prerequisites
Before you begin, ensure you have the following installed:

PHP 8.1 or higher

Composer

Node.js 16 or higher

MySQL 5.7 or higher

Git

🚀 Quick Start
1. Clone the Repository
bash
git clone <your-repository-url>
cd task-management-system
2. Backend Setup
Navigate to backend directory:
bash
cd backend
Install PHP dependencies:
bash
composer install
Environment Configuration:
Copy the environment file and configure your database:

bash
cp .env.example .env
Edit .env file with your database credentials:

env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=task_management
DB_USERNAME=your_username
DB_PASSWORD=your_password
Generate application key:
bash
php artisan key:generate
Generate JWT secret:
bash
php artisan jwt:secret
Run migrations:
bash
php artisan migrate
(Optional) Seed with sample data:
bash
php artisan db:seed
Start the development server:
bash
php artisan serve
The backend API will be available at http://localhost:8000

3. Frontend Setup
Navigate to frontend directory:
bash
cd ../frontend
Install JavaScript dependencies:
bash
npm install
Environment Configuration:
Create a .env file in the frontend directory:

env
VITE_API_URL=http://localhost:8000/api
Start the development server:
bash
npm run dev
The frontend application will be available at http://localhost:5173

📁 Project Structure
text
task-management-system/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Requests/
│   │   ├── Models/
│   │   └── Policies/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   └── tests/
└── frontend/               # React Application
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   └── utils/
    └── public/
🔌 API Endpoints
Authentication
POST /api/register - User registration

POST /api/login - User login

POST /api/logout - User logout

GET /api/user - Get authenticated user

Tasks
GET /api/tasks - Get all tasks (with filtering)

POST /api/tasks - Create a new task

GET /api/tasks/{id} - Get specific task

PUT /api/tasks/{id} - Update a task

DELETE /api/tasks/{id} - Delete a task

Query Parameters for Tasks
status - Filter by status (pending, in-progress, completed)

sort_by - Sort field (due_date, created_at)

sort_order - Sort order (asc, desc)

👥 Default Users
After running seeds, you'll have:

Admin User:

Email: admin@example.com

Password: password

Role: Admin (can view all tasks)

Regular User:

Email: user@example.com

Password: password

Role: User (can only view own tasks)

🧪 Running Tests
Backend Tests:
bash
cd backend
php artisan test
Test Coverage:
Authentication (Register/Login)

Task CRUD operations

Authorization policies

Validation rules

🎯 Usage
Registration & Login

Register a new account or use provided test accounts

Login to receive JWT token

Managing Tasks

Create new tasks with title, description, status, and due date

View all tasks in a responsive list

Filter tasks by status

Sort tasks by due date or creation date

Edit existing tasks

Delete tasks

User Roles

Regular Users: Can only view and manage their own tasks

Admin Users: Can view and manage all users' tasks

🔒 Security Features
JWT token-based authentication

Password hashing

CSRF protection

CORS configuration

Input validation

SQL injection prevention

XSS protection

🚀 Deployment
Backend Deployment (Laravel)
Server Requirements:

PHP 8.1+

MySQL 5.7+

Web server (Apache/Nginx)

Composer

Deployment Steps:

bash
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan jwt:secret
php artisan migrate --force
php artisan config:cache
php artisan route:cache
Frontend Deployment (React)
Build for production:

bash
npm run build
Deploy the dist folder to your web server

🐛 Troubleshooting
Common Issues:
CORS Errors

Ensure backend CORS is configured properly

Check API URL in frontend environment variables

Authentication Issues

Verify JWT secret is generated

Check token storage in localStorage

Ensure tokens are included in request headers

Database Connection

Verify database credentials in .env

Ensure MySQL server is running

Check migration status

Frontend Build Issues

Clear node modules: rm -rf node_modules && npm install

Check Node.js version compatibility