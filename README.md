# TaskFlow: Task Management Application

A full-stack task management web application built with the MERN stack (MongoDB, Express.js, React, Node.js) for my GoMyCode Lab Phase project.

## Features (planned)
- User registration and login (JWT)
- Create, edit, delete tasks with title, description, deadline, priority
- Task status: todo / in-progress / completed
- Filter, search and sort tasks
- Responsive UI (React + Bootstrap)

## Tech Stack
React, Node.js, Express.js, MongoDB (Mongoose)

## Project Structure
```
client/   React frontend (Phase 3+)
server/   Express API + MongoDB
  config/        database connection
  models/        Mongoose schemas
  controllers/   request logic
  routes/        API routes
  server.js      entry point
```

## Phase 1: Project Setup and Backend Configuration (done)
- Project structure created
- Dependencies installed: express, mongoose, dotenv, cors, nodemon
- MongoDB connection configured
- CRUD endpoints for tasks

### Run the backend
```bash
cd server
npm install
cp .env.example .env     # then set your MONGO_URI
npm run dev
```

### API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/tasks | Create a task |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get one task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Status
In progress: Phase 1 of 6 completed
