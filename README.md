# Task Management System – Laravel + React

A **Task Management System** built with **Laravel 10+** (backend) and **React + Vite** (frontend).
Features **JWT authentication**, **RBAC (admin/user)**, **task filtering**, and frontend deployed on **Vercel**.

---

## Project Structure

```
task-management-system/
├─ backend/      → Laravel API
├─ frontend/     → React App
├─ README.md
```

---

## Features

### Backend (Laravel)

* User registration & login (JWT)
* Tasks CRUD (Create, Read, Update, Delete)
* RBAC: Admins see all tasks; users see only their own
* Admins can **delete or deactivate users**
* Task filtering by status
* Validation using Form Requests
* **SQLite database used**

### Frontend (React)

* Login & Register pages
* Task list with filtering by status
* Task Create/Edit page
* State management with React Context
* Deployed on **Vercel**

---

## Backend Setup (SQLite)

1. Clone the repository and enter the backend folder:

```bash
git clone https://github.com/wabii-koo/task-management-system.git
cd task-management-system/backend
```

2. Install dependencies:

```bash
composer install
```

3. Copy the environment file and configure SQLite database:

```bash
cp .env.example .env
```

Set in `.env`:

```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

4. Ensure the SQLite database file exists:

```bash
touch database/database.sqlite
```

5. Generate application key and run migrations:

```bash
php artisan key:generate
php artisan migrate
```

6. Run the backend server:

```bash
php artisan serve
```

Backend URL: `http://localhost:8000`

---

## API Endpoints

**Base URL:** `http://localhost:8000/api`

| Method | Endpoint               | Description                                |
| ------ | ---------------------- | ------------------------------------------ |
| POST   | /register              | Register new user                          |
| POST   | /login                 | Authenticate user & get token              |
| GET    | /tasks                 | List tasks (admin sees all, users see own) |
| POST   | /tasks                 | Create task                                |
| PUT    | /tasks/{id}            | Update task (owner only)                   |
| DELETE | /tasks/{id}            | Delete task (owner only)                   |
| PUT    | /users/{id}/deactivate | Admin can deactivate user                  |
| DELETE | /users/{id}            | Admin can delete user                      |

**Task Filtering:**

```
GET /tasks?status=pending
```

---

## Frontend Setup

1. Enter frontend folder:

```bash
cd ../frontend
npm install
npm run dev
```

2. Vite runs at: `http://localhost:5173`

3. Set API URL in environment variable:

```
VITE_API_URL=http://localhost:8000/api
```

**Deployment:** Frontend is deployed on **Vercel**.

---

## Bonus Features Implemented

* **RBAC:** Admin vs user permissions (including user deletion/deactivation)
* **Task Filtering:** Filter tasks by status (pending, in-progress, completed)

---

## Testing

Run backend unit tests:

```bash
php artisan test
```

---

## Usage Instructions

1. Open the frontend in browser (Vercel or local):

```
http://localhost:5173
```

2. Register a new user or login.

3. Use **Task List** page to view tasks:

   * Admins see all tasks
   * Users see only their own tasks

4. Use **Task Form** to create or edit tasks.

5. Admins can **delete or deactivate users** from user management.

6. Filter tasks by **status** using dropdown.

7. JWT authentication ensures secure API access.
