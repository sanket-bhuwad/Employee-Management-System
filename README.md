# Employee Management System (Angular + Node.js + MySQL)

Full-stack Employee Management System with JWT admin login, employee CRUD APIs, dashboard statistics, responsive UI, search, pagination, form validation, spinner, toast notifications, and dark mode.

## Tech Stack

- Frontend: Angular 16, Angular Material, Bootstrap, ngx-toastr, ngx-spinner
- Backend: Node.js, Express, MySQL, dotenv, cors, body-parser, jsonwebtoken
- Database: MySQL

## Folder Structure

```text
EmployeeManagementSystem/
  backend/
    config/
      db.js
    controllers/
      authController.js
      employeeController.js
    middleware/
      authMiddleware.js
    models/
      employeeModel.js
    routes/
      authRoutes.js
      employeeRoutes.js
    app.js
    server.js
    .env.example
  frontend/
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

## Features Included

- JWT-based admin authentication
- Protected dashboard routes
- Employee CRUD with validation
- Search filter and pagination
- Loading spinner and toast notifications
- Employee statistics cards
- Responsive top navbar + sidebar layout
- Dark mode toggle

## Notes

- Current workspace uses Node 16. Angular CLI 16 is used for compatibility.
- Ensure MySQL server is running before starting backend.
