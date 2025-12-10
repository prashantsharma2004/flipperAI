# Frontend-Backend Integration Guide

## Integration Status: ✅ Complete

The frontend and backend are fully integrated and ready to use.

## API Endpoints Mapping

### Frontend → Backend Integration

| Frontend Action | API Endpoint | Method | Description |
|----------------|--------------|--------|-------------|
| Load Projects | `/api/projects` | GET | Fetches all projects for landing page |
| Add Project | `/api/projects` | POST | Admin adds new project |
| Load Clients | `/api/clients` | GET | Fetches all clients for landing page |
| Add Client | `/api/clients` | POST | Admin adds new client |
| Submit Contact Form | `/api/contacts` | POST | User submits contact form |
| View Contacts | `/api/contacts` | GET | Admin views all contact submissions |
| Subscribe Newsletter | `/api/newsletter/subscribe` | POST | User subscribes to newsletter |
| View Newsletters | `/api/newsletter/all` | GET | Admin views all subscriptions |
| Health Check | `/api/health` | GET | API connection status |

## How It Works

### 1. Landing Page (`index.html`)
- Automatically loads projects and clients on page load
- Submits contact form data to backend
- Submits newsletter subscription to backend
- All API calls use `fetch()` with proper error handling

### 2. Admin Panel (`admin.html`)
- Tabbed interface for managing different sections
- Can add projects and clients via forms
- Views contact submissions and newsletter subscriptions
- Real-time updates after adding new items

### 3. Backend API
- RESTful API endpoints using Spring Boot
- CORS enabled for cross-origin requests
- H2 in-memory database for data storage
- JSON request/response format

## Testing the Integration

### Step 1: Start the Backend
```bash
cd "/Users/mayank/Mayank Jadhav task"
mvn spring-boot:run
```

Wait for: `Started PortfolioApplication in X.XXX seconds`

### Step 2: Open Frontend
- Landing Page: `http://localhost:8080/index.html`
- Admin Panel: `http://localhost:8080/admin.html`

### Step 3: Test Integration

1. **Test Projects:**
   - Go to Admin Panel → Projects tab
   - Add a project with name, description, and image URL
   - Go to Landing Page → Projects section should show the new project

2. **Test Clients:**
   - Go to Admin Panel → Clients tab
   - Add a client with all details
   - Go to Landing Page → Happy Clients section should show the new client

3. **Test Contact Form:**
   - Go to Landing Page → Contact section
   - Fill and submit the contact form
   - Go to Admin Panel → Contact Forms tab
   - Verify the submission appears

4. **Test Newsletter:**
   - Go to Landing Page → Newsletter section
   - Enter email and subscribe
   - Go to Admin Panel → Newsletters tab
   - Verify the email appears

## API Request/Response Examples

### Add Project (POST /api/projects)
**Request:**
```json
{
  "name": "E-Commerce Website",
  "description": "A modern e-commerce platform",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "E-Commerce Website",
  "description": "A modern e-commerce platform",
  "imageUrl": "https://example.com/image.jpg",
  "createdAt": "2024-12-09T18:30:00"
}
```

### Subscribe Newsletter (POST /api/newsletter/subscribe)
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Subscribed successfully"
}
```

## Troubleshooting

### Issue: Frontend cannot connect to backend
**Solution:** 
- Ensure backend is running on port 8080
- Check browser console for CORS errors
- Verify API_BASE_URL in script.js and admin.js

### Issue: Data not persisting
**Solution:**
- H2 database is in-memory, data resets on server restart
- This is expected behavior for development

### Issue: CORS errors
**Solution:**
- Backend has CORS enabled globally via CorsConfig
- All controllers have @CrossOrigin annotation
- Check browser console for specific error messages

## File Structure

```
src/main/
├── java/com/app/
│   ├── PortfolioApplication.java
│   ├── config/
│   │   └── CorsConfig.java          # Global CORS configuration
│   ├── controller/                  # REST API endpoints
│   │   ├── ProjectController.java
│   │   ├── ClientController.java
│   │   ├── ContactController.java
│   │   ├── NewsletterController.java
│   │   └── HealthController.java
│   ├── service/                     # Business logic
│   ├── repository/                  # Data access
│   └── entity/                      # Database entities
└── resources/
    ├── static/                      # Frontend files
    │   ├── index.html              # Landing page
    │   ├── admin.html              # Admin panel
    │   ├── styles.css              # Styling
    │   ├── script.js               # Landing page JS
    │   └── admin.js                # Admin panel JS
    └── application.properties       # Configuration
```

## Next Steps

1. Start the backend server
2. Open the frontend pages in browser
3. Test all features end-to-end
4. Add sample data via admin panel
5. Verify data appears on landing page

Integration is complete and ready for use! 🚀

