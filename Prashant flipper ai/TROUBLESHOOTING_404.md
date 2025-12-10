# Troubleshooting 404 Errors

## Common 404 Error Scenarios and Solutions

### 1. Frontend Pages Not Found (404)

**Error:** `http://localhost:8080/` or `http://localhost:8080/index.html` returns 404

**Solutions:**

#### Solution A: Use Full Path
Make sure you're accessing the full path:
```
✅ http://localhost:8080/index.html
✅ http://localhost:8080/admin.html
❌ http://localhost:8080/ (without index.html)
```

#### Solution B: Check Server is Running
Verify the Spring Boot server is running:
```bash
# Check if process is running
ps aux | grep "spring-boot"

# Check if port 8080 is in use
lsof -i :8080
```

#### Solution C: Verify File Locations
Ensure files are in the correct location:
```
src/main/resources/static/
├── index.html
├── admin.html
├── styles.css
├── script.js
└── admin.js
```

#### Solution D: Rebuild and Restart
```bash
mvn clean install
mvn spring-boot:run
```

### 2. API Endpoints Not Found (404)

**Error:** `http://localhost:8080/api/projects` returns 404

**Solutions:**

#### Check API Endpoints
Verify you're using the correct endpoints:
```
✅ GET  http://localhost:8080/api/projects
✅ GET  http://localhost:8080/api/clients
✅ POST http://localhost:8080/api/contacts
✅ GET  http://localhost:8080/api/health
```

#### Verify Controllers
Check that controllers are properly annotated:
- `@RestController` annotation present
- `@RequestMapping` or `@GetMapping`/`@PostMapping` present
- Package is under `com.app` (scanned by Spring Boot)

#### Check Application Logs
Look for controller mapping in startup logs:
```
Mapped "{[/api/projects],methods=[GET]}" ...
Mapped "{[/api/clients],methods=[GET]}" ...
```

### 3. Static Resources (CSS/JS) Not Loading

**Error:** CSS or JavaScript files return 404

**Solutions:**

#### Check File Paths in HTML
In `index.html` and `admin.html`, verify:
```html
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
```

Not:
```html
❌ <link rel="stylesheet" href="/styles.css">
❌ <script src="/script.js"></script>
```

#### Verify Files Exist
```bash
ls -la src/main/resources/static/
```

Should show:
- styles.css
- script.js
- admin.js

#### Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or clear browser cache

### 4. Database Connection Issues

**Error:** Application starts but API calls fail

**Solutions:**

#### Check MySQL is Running
```bash
# macOS
brew services list

# Linux
sudo systemctl status mysql
```

#### Verify Database Exists
```sql
mysql -u root -p
SHOW DATABASES;
```

Should see `portfolio_db` in the list.

#### Check Credentials
Verify in `application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_actual_password
```

### 5. Port Already in Use

**Error:** `Port 8080 is already in use`

**Solutions:**

#### Find and Kill Process
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process (replace PID with actual process ID)
kill -9 PID
```

#### Change Port
Edit `application.properties`:
```properties
server.port=8081
```

Then access at: `http://localhost:8081/index.html`

### 6. Build/Compilation Errors

**Error:** Application won't start

**Solutions:**

#### Clean Build
```bash
mvn clean install
```

#### Check Java Version
```bash
java -version
```
Should be Java 11 or higher.

#### Check Maven
```bash
mvn -version
```

### 7. CORS Errors (Browser Console)

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solutions:**

This should be fixed by `CorsConfig.java`. If still occurring:

1. Verify `CorsConfig` is in `com.app.config` package
2. Check `@Configuration` annotation is present
3. Restart the application

## Quick Diagnostic Checklist

Run through this checklist:

- [ ] MySQL server is running
- [ ] Database `portfolio_db` exists
- [ ] MySQL credentials are correct in `application.properties`
- [ ] Spring Boot application started successfully
- [ ] No errors in console/terminal
- [ ] Using correct URL: `http://localhost:8080/index.html`
- [ ] Files exist in `src/main/resources/static/`
- [ ] Browser cache cleared
- [ ] Port 8080 is not blocked

## Testing Endpoints

### Test Health Endpoint
```bash
curl http://localhost:8080/api/health
```

Expected response:
```json
{"status":"UP","message":"API is running"}
```

### Test Projects Endpoint
```bash
curl http://localhost:8080/api/projects
```

Expected response:
```json
[]
```
(Empty array if no projects, or array of projects)

### Test Static Files
```bash
curl http://localhost:8080/index.html
curl http://localhost:8080/styles.css
```

Should return file content, not 404.

## Common Fixes Applied

The following fixes have been implemented:

1. ✅ **WebController** - Handles root path redirects
2. ✅ **Static Resource Configuration** - Explicit static resource mapping
3. ✅ **CORS Configuration** - Enhanced with resource handlers

## Still Getting 404?

1. **Check Application Logs:**
   Look for errors in the terminal where you ran `mvn spring-boot:run`

2. **Verify File Structure:**
   ```bash
   find src/main/resources/static -type f
   ```

3. **Test Direct Access:**
   Try accessing files directly:
   - `http://localhost:8080/index.html`
   - `http://localhost:8080/admin.html`
   - `http://localhost:8080/styles.css`

4. **Check Browser Console:**
   Open browser DevTools (F12) and check Console tab for errors

5. **Verify Server Started:**
   Look for this message in logs:
   ```
   Started PortfolioApplication in X.XXX seconds
   ```

## Need More Help?

If 404 errors persist:
1. Share the exact URL you're trying to access
2. Share the error message from browser console
3. Share the application startup logs
4. Verify all files are in correct locations

