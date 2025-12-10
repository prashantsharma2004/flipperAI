# Quick Start Guide

## 🚀 Start the Application

### 1. Start Backend Server
```bash
cd "/Users/mayank/Mayank Jadhav task"
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

### 2. Access Frontend

**Landing Page:**
- URL: `http://localhost:8080/index.html`
- Features: View projects, clients, submit contact form, subscribe newsletter

**Admin Panel:**
- URL: `http://localhost:8080/admin.html`
- Features: Manage projects, clients, view contacts and newsletters

## ✅ Integration Features

### Frontend ↔ Backend Communication
- ✅ All API endpoints are connected
- ✅ CORS enabled for cross-origin requests
- ✅ Error handling implemented
- ✅ Real-time data updates
- ✅ Form validation

### API Endpoints Available
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create client
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts
- `POST /api/newsletter/subscribe` - Subscribe newsletter
- `GET /api/newsletter/all` - Get all subscriptions
- `GET /api/health` - API health check

## 🧪 Quick Test

1. Start the backend server
2. Open `http://localhost:8080/admin.html`
3. Add a project in the Projects tab
4. Open `http://localhost:8080/index.html`
5. Verify the project appears in the "Our Projects" section

## 📝 Notes

- Backend runs on port 8080
- Frontend is served from the same server
- Database is H2 in-memory (data resets on restart)
- All API calls use JSON format
- CORS is configured globally

Everything is integrated and ready to use! 🎉

