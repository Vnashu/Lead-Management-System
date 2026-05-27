# Lead Management System

A full-stack Lead Management System built using FastAPI, React.js, PostgreSQL, Docker, and AWS EC2 deployment.

---

# Project Overview

This application allows users to:

- Create Leads
- Update Lead Status
- Delete Leads
- Search Leads
- Filter Leads by Status
- Paginate Lead Listings

The project demonstrates:
- Backend API development
- Frontend UI development
- Database design
- API integration
- Docker deployment
- AWS deployment

---

# Tech Stack

## Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Uvicorn

## Frontend
- React.js
- Axios
- Vite

## Deployment
- Docker
- AWS EC2
- AWS RDS PostgreSQL

---

# Features

## Backend APIs
- Create Lead
- Update Lead
- Get Lead Details
- Delete Lead
- List Leads

## Search & Filter
- Search by Name
- Filter by Status

## Pagination
- Paginated Lead Listing APIs

## Status Tracking
Supported lead statuses:
- New
- In Progress
- Follow-up
- Converted
- Closed

## Frontend Features
- Responsive UI
- Lead Listing Page
- Create Lead Form
- Search & Filter
- Pagination
- Status Update Dropdown

---

# Database Schema

## Leads Table

| Field           | Type      |
|----------------|-----------|
| id             | Integer   |
| name           | String    |
| mobile_number  | String    |
| email          | String    |
| source         | String    |
| status         | String    |
| created_at     | DateTime  |
| updated_at     | DateTime  |

---

# API Documentation

FastAPI Swagger Documentation:

```bash
http://13.206.194.73:8000/docs
```

---

# Project Structure

```bash
lead-management-system/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── README.md
└── .gitignore
```

---

# Backend Setup

## Local Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://13.206.194.73:3000/
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://13.206.194.73:3000/
```

---

# Docker Setup

## Backend Docker

Build image:

```bash
docker build -t lead-backend .
```

Run container:

```bash
docker run -d -p 8000:8000 --env-file .env --name lead-backend-container lead-backend
```

---

## Frontend Docker

Build image:

```bash
docker build -t lead-frontend .
```

Run container:

```bash
docker run -d -p 3000:3000 --name lead-frontend-container lead-frontend
```

---

# AWS Deployment

The application is deployed using:

- AWS EC2
- AWS RDS PostgreSQL
- Docker Containers

---

# Live URLs

## Frontend

```bash
http://13.206.194.73:3000/
```

## Backend Swagger Docs

```bash
http://13.206.194.73:8000/docs
```

---

# Error Handling

Implemented:
- API exception handling
- Validation handling
- Frontend error alerts
- HTTP status responses

---

# Scalability Approach

The project follows scalable architecture practices:

- Modular FastAPI routers
- PostgreSQL relational database
- Pagination for optimized API responses
- Dockerized deployment
- Separate frontend and backend services
- AWS cloud deployment

---

# Bonus Features Implemented

- Docker Setup
- Swagger/OpenAPI Documentation
- AWS Deployment
- Responsive UI
- Proper Error Handling

---

# Author

Developed as part of Technical Assessment Submission.
