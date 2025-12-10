# MySQL Database Setup Guide

## Prerequisites

- MySQL Server installed (version 8.0 or higher recommended)
- MySQL Workbench or command line access to MySQL

## Setup Steps

### 1. Install MySQL (if not already installed)

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Windows:**
Download and install from: https://dev.mysql.com/downloads/mysql/

**Linux:**
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo systemctl start mysql
```

### 2. Create Database

Login to MySQL:
```bash
mysql -u root -p
```

Create the database:
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Verify database creation:
```sql
SHOW DATABASES;
```

Exit MySQL:
```sql
EXIT;
```

### 3. Update Application Configuration

Edit `src/main/resources/application.properties` and update these values:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

**Default values:**
- Username: `root`
- Password: `root` (change this to your MySQL root password)

### 4. Run the Application

```bash
mvn clean install
mvn spring-boot:run
```

The application will automatically:
- Connect to MySQL database
- Create tables automatically (due to `spring.jpa.hibernate.ddl-auto=update`)
- Initialize the schema

### 5. Verify Database Connection

Check if tables are created:
```bash
mysql -u root -p
USE portfolio_db;
SHOW TABLES;
```

You should see:
- `projects`
- `clients`
- `contacts`
- `newsletters`

## Troubleshooting

### Connection Refused Error

**Issue:** `Communications link failure`

**Solution:**
1. Ensure MySQL server is running:
   ```bash
   # macOS/Linux
   sudo systemctl status mysql
   # or
   brew services list
   
   # Start MySQL if not running
   sudo systemctl start mysql
   # or
   brew services start mysql
   ```

2. Check MySQL port (default: 3306):
   ```bash
   netstat -an | grep 3306
   ```

### Access Denied Error

**Issue:** `Access denied for user 'root'@'localhost'`

**Solution:**
1. Reset MySQL root password:
   ```bash
   mysql -u root -p
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
   FLUSH PRIVILEGES;
   ```

2. Update `application.properties` with correct password

### Timezone Error

**Issue:** `The server time zone value 'IST' is unrecognized`

**Solution:**
The connection URL already includes `serverTimezone=UTC`. If issues persist:
```sql
SET GLOBAL time_zone = '+00:00';
```

### Database Not Found

**Issue:** `Unknown database 'portfolio_db'`

**Solution:**
Create the database manually:
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Database Schema

The application will automatically create these tables:

### Projects Table
- `id` (BIGINT, Primary Key, Auto Increment)
- `name` (VARCHAR, NOT NULL)
- `description` (VARCHAR)
- `image_url` (VARCHAR, NOT NULL)
- `created_at` (TIMESTAMP)

### Clients Table
- `id` (BIGINT, Primary Key, Auto Increment)
- `name` (VARCHAR, NOT NULL)
- `description` (VARCHAR)
- `designation` (VARCHAR, NOT NULL)
- `image_url` (VARCHAR, NOT NULL)
- `created_at` (TIMESTAMP)

### Contacts Table
- `id` (BIGINT, Primary Key, Auto Increment)
- `full_name` (VARCHAR, NOT NULL)
- `email` (VARCHAR, NOT NULL)
- `mobile_number` (VARCHAR, NOT NULL)
- `city` (VARCHAR, NOT NULL)
- `created_at` (TIMESTAMP)

### Newsletters Table
- `id` (BIGINT, Primary Key, Auto Increment)
- `email` (VARCHAR, NOT NULL, UNIQUE)
- `created_at` (TIMESTAMP)

## Production Recommendations

1. **Change Default Password:** Never use default passwords in production
2. **Use Connection Pooling:** Already configured via Spring Boot
3. **Enable SSL:** Update connection URL to use SSL in production
4. **Backup Regularly:** Set up automated backups
5. **Monitor Performance:** Use MySQL monitoring tools
6. **Create Dedicated User:** Don't use root user in production

```sql
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
```

Then update `application.properties`:
```properties
spring.datasource.username=portfolio_user
spring.datasource.password=strong_password
```

