# Employee Management System (Angular + Node.js + MySQL)

Full-stack Employee Management System with JWT admin login, employee CRUD APIs, dashboard statistics, responsive UI, search, pagination, form validation, spinner, toast notifications, and dark mode.

## Tech Stack

- Frontend: Angular 16, Angular Material, Bootstrap, ngx-toastr, ngx-spinner
- Backend: Node.js, Express, MySQL, dotenv, cors, body-parser, jsonwebtoken, helmet, express-rate-limit
- Database: MySQL

## Folder Structure

```text
EmployeeManagementSystem/
  backend/
    config/
      env.js
      db.js
    controllers/
      authController.js
      employeeController.js
    middleware/
      authMiddleware.js
      errorHandler.js
      notFound.js
      validators/
        authValidation.js
        employeeValidation.js
    models/
      employeeModel.js
    routes/
      authRoutes.js
      employeeRoutes.js
    app.js
    server.js
    .env.example
  frontend/
    src/environments/
      environment.ts
      environment.prod.ts
    src/app/
      components/
        dashboard/
        employee-form/
        employee-list/
        login/
        navbar/
        sidebar/
      guards/
        auth.guard.ts
      interceptors/
        auth.interceptor.ts
      models/
        employee.model.ts
      services/
        auth.service.ts
        employee.service.ts
        theme.service.ts
  database/
    schema.sql
```

## Backend API Endpoints

- `POST /api/auth/login`
- `POST /api/auth/signup`
- `GET /api/employees`
- `GET /api/employees/:id`
- `POST /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`
- `GET /api/employees/stats`

All employee routes require `Authorization: Bearer <token>`.

## Setup Instructions

## 1) Database Setup

Run SQL from `database/schema.sql` in MySQL.

## 2) Backend Setup

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Update `.env` with your MySQL credentials and secure JWT/admin values.

Start backend:

```powershell
npm run dev
```

Backend runs on `http://localhost:5000`.

## 3) Frontend Setup

```powershell
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`.

## Default Login

Use values from backend `.env`:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`)

## First-Time Admin Signup Flow

1. Open `http://localhost:4200/signup`
2. Create admin account (stored in `admins` table)
3. Login from `http://localhost:4200/login`
4. Access dashboard and start managing employees

## Features Included

- JWT-based admin authentication
- Auth interceptor with automatic token attach and 401 session handling
- Protected dashboard routes
- Employee CRUD with validation
- Search filter and pagination
- Loading spinner and toast notifications
- Employee statistics cards
- Responsive top navbar + sidebar layout
- Dark mode toggle

## Industry Standard Upgrades

- Centralized environment configuration (`backend/config/env.js`)
- Security hardening with `helmet` and API rate limiting
- Validation middleware for auth and employee payloads
- Standardized not-found and global error handlers
- Environment-based frontend API base URL setup
- Angular production environment file replacements

## Notes

- Current workspace uses Node 16. Angular CLI 16 is used for compatibility.
- Ensure MySQL server is running before starting backend.
