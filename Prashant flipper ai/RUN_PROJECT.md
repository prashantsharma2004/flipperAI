# How to Run the Project

This guide will help you run both the frontend and backend server.

## Quick Start

Since the frontend is served by the Spring Boot backend, you only need to run **one command** to start everything!

## Prerequisites Check

Before running, make sure you have:

1. ✅ **Java JDK 11+** installed
   ```bash
   java -version
   ```

2. ✅ **Maven** installed
   ```bash
   mvn -version
   ```

3. ✅ **MySQL Server** installed and running
   ```bash
   mysql --version
   ```

## Step-by-Step Instructions

### Step 1: Setup MySQL Database

**1.1 Start MySQL Server**

**macOS:**
```bash
brew services start mysql
# or
mysql.server start
```

**Windows:**
- Start MySQL from Services or use MySQL Workbench

**Linux:**
```bash
sudo systemctl start mysql
```

**1.2 Create Database**

Open MySQL command line:
```bash
mysql -u root -p
```

Enter your MySQL root password, then run:
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

**1.3 Update Database Credentials**

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

Replace `your_mysql_password` with your actual MySQL root password.

### Step 2: Build the Project

Navigate to project directory:
```bash
cd "/Users/mayank/Mayank Jadhav task"
```

Build the project:
```bash
mvn clean install
```

### Step 3: Run the Application

Start the Spring Boot server (this runs both backend and frontend):
```bash
mvn spring-boot:run
```

Wait for the message:
```
Started PortfolioApplication in X.XXX seconds
```

### Step 4: Access the Application

Once the server is running, open your browser:

**Frontend - Landing Page:**
```
http://localhost:8080/index.html
```

**Frontend - Admin Panel:**
```
http://localhost:8080/admin.html
```

**Backend API Health Check:**
```
http://localhost:8080/api/health
```

## What Happens When You Run

1. **Backend Server Starts** on port 8080
2. **MySQL Connection** is established
3. **Database Tables** are automatically created (projects, clients, contacts, newsletters)
4. **Frontend Files** are served from `/static` folder
5. **REST API** endpoints become available at `/api/*`

## Troubleshooting

### Error: "Communications link failure"

**Problem:** MySQL server is not running

**Solution:**
```bash
# Check if MySQL is running
brew services list  # macOS
# or
sudo systemctl status mysql  # Linux

# Start MySQL
brew services start mysql  # macOS
# or
sudo systemctl start mysql  # Linux
```

### Error: "Access denied for user"

**Problem:** Wrong MySQL username/password

**Solution:**
1. Check your MySQL credentials
2. Update `src/main/resources/application.properties` with correct username and password

### Error: "Unknown database 'portfolio_db'"

**Problem:** Database doesn't exist

**Solution:**
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Port 8080 Already in Use

**Problem:** Another application is using port 8080

**Solution 1:** Stop the other application

**Solution 2:** Change port in `application.properties`:
```properties
server.port=8081
```

Then access at: `http://localhost:8081/index.html`

### Frontend Not Loading

**Problem:** Static files not found

**Solution:**
1. Make sure you're accessing `http://localhost:8080/index.html` (not just `/`)
2. Check browser console for errors
3. Verify files exist in `src/main/resources/static/`

## Running in Background (Optional)

To run the server in the background:

**macOS/Linux:**
```bash
nohup mvn spring-boot:run > server.log 2>&1 &
```

To stop:
```bash
pkill -f "spring-boot:run"
```

## Development Tips

### View Logs
The application logs will show in the terminal. Look for:
- Database connection status
- API requests
- Any errors

### Hot Reload
If you make changes to Java code, restart the server:
```bash
# Stop: Ctrl+C
# Start again:
mvn spring-boot:run
```

### Test API Endpoints

You can test the API using curl:

```bash
# Health check
curl http://localhost:8080/api/health

# Get all projects
curl http://localhost:8080/api/projects

# Get all clients
curl http://localhost:8080/api/clients
```

## Project Structure

```
Your Project/
├── src/main/
│   ├── java/com/app/          # Backend Java code
│   └── resources/
│       ├── static/            # Frontend files (HTML, CSS, JS)
│       └── application.properties  # Configuration
└── pom.xml                    # Maven dependencies
```

## Summary

**To run everything:**
1. ✅ MySQL running
2. ✅ Database created
3. ✅ Credentials updated
4. ✅ Run: `mvn spring-boot:run`
5. ✅ Open: `http://localhost:8080/index.html`

That's it! Both frontend and backend run together from one command! 🚀

