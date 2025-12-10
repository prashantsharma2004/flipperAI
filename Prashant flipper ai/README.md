# Portfolio Application

Full-stack application with landing page and admin panel for managing projects, clients, contact forms, and newsletter subscriptions.

## Technology Stack

- **Backend**: Java Spring Boot
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MySQL

## Prerequisites

- Java JDK 11 or higher
- Maven 3.6 or higher
- MySQL Server 8.0 or higher

## Setup Instructions

1. **Setup MySQL Database:**
   - Install MySQL Server if not already installed
   - Create a database:
     ```sql
     CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
     ```
   - Update database credentials in `src/main/resources/application.properties`:
     ```properties
     spring.datasource.username=your_mysql_username
     spring.datasource.password=your_mysql_password
     ```

2. **Clone or download the project**

3. **Navigate to the project directory:**
   ```bash
   cd "Mayank Jadhav task"
   ```

4. **Build the project using Maven:**
   ```bash
   mvn clean install
   ```

5. **Run the Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```
   The application will automatically create tables in the MySQL database.

6. **Open your browser and navigate to:**
   - Landing Page: `http://localhost:8080/index.html`
   - Admin Panel: `http://localhost:8080/admin.html`

For detailed MySQL setup instructions, see [DATABASE_SETUP.md](DATABASE_SETUP.md)

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create a new client

### Contacts
- `GET /api/contacts` - Get all contact form submissions
- `POST /api/contacts` - Submit a contact form

### Newsletter
- `GET /api/newsletter/all` - Get all newsletter subscriptions
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

## Features

### Landing Page
- Display all projects with images, names, and descriptions
- Display all clients with images, names, descriptions, and designations
- Contact form for user submissions
- Newsletter subscription form

### Admin Panel
- Add and manage projects
- Add and manage clients
- View all contact form submissions
- View all newsletter subscriptions

## Database

The application uses MySQL database. Tables are automatically created on first run.

**Default Configuration:**
- Database Name: `portfolio_db`
- Host: `localhost`
- Port: `3306`
- Username: `root` (update in application.properties)
- Password: `root` (update in application.properties)

**Note:** Make sure MySQL server is running before starting the application.

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/app/
│   │       ├── PortfolioApplication.java
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       └── entity/
│   └── resources/
│       ├── static/
│       │   ├── index.html
│       │   ├── admin.html
│       │   ├── styles.css
│       │   ├── script.js
│       │   └── admin.js
│       └── application.properties
└── pom.xml
```

## Notes

- The application runs on port 8080 by default
- Data is persisted in MySQL database
- Image URLs can be provided as full URLs or base64 data URLs (from image cropping feature)
- Tables are automatically created on first run
- Make sure MySQL server is running before starting the application

