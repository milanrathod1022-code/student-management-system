# Testing Guide for Student Management System

## Prerequisites for Testing

1. **MongoDB** must be running on `mongodb://localhost:27017`
2. **Backend Server** must be running on `http://localhost:5000`
3. **Frontend** must be running on `http://localhost:3000`

## Backend API Testing

You can test the API endpoints using curl, Postman, or any API testing tool.

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

Expected Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Create a Student (POST)

```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 20,
    "grade": "A",
    "course": "Computer Science",
    "phone": "1234567890",
    "address": "123 Main St",
    "status": "active"
  }'
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 20,
    "grade": "A",
    "course": "Computer Science",
    "phone": "1234567890",
    "address": "123 Main St",
    "status": "active",
    "enrollmentDate": "...",
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Student created successfully"
}
```

### 3. Get All Students (GET)

```bash
curl http://localhost:5000/api/students
```

Expected Response:
```json
{
  "success": true,
  "count": 1,
  "data": [...]
}
```

### 4. Get Single Student (GET)

```bash
curl http://localhost:5000/api/students/{student_id}
```

Replace `{student_id}` with the actual student ID from the previous response.

### 5. Update Student (PUT)

```bash
curl -X PUT http://localhost:5000/api/students/{student_id} \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "age": 21,
    "grade": "A+",
    "course": "Computer Science",
    "status": "active"
  }'
```

### 6. Delete Student (DELETE)

```bash
curl -X DELETE http://localhost:5000/api/students/{student_id}
```

### 7. Search Students

```bash
curl "http://localhost:5000/api/students?search=John"
```

### 8. Filter by Status

```bash
curl "http://localhost:5000/api/students?status=active"
```

### 9. Sort Students

```bash
curl "http://localhost:5000/api/students?sort=firstName"
# or descending:
curl "http://localhost:5000/api/students?sort=-createdAt"
```

## Frontend Testing

### Manual Testing Steps

1. **Navigate to the Application**
   - Open `http://localhost:3000` in your browser

2. **Test Add Student Functionality**
   - Click "Add New Student" button
   - Fill in the form with valid data
   - Click "Add Student" button
   - Verify success message appears
   - Verify student appears in the list

3. **Test Search Functionality**
   - Type a name in the search box
   - Verify the list filters correctly

4. **Test Filter by Status**
   - Select different status values from the dropdown
   - Verify the list updates accordingly

5. **Test View Student Details**
   - Click the "View" button on a student
   - Verify all details are displayed correctly
   - Click "Back to List"

6. **Test Edit Student**
   - Click the "Edit" button on a student
   - Modify some fields
   - Click "Update Student"
   - Verify success message appears
   - Verify changes are reflected in the list

7. **Test Delete Student**
   - Click the "Delete" button on a student
   - Verify confirmation modal appears
   - Click "Delete" to confirm
   - Verify success message appears
   - Verify student is removed from the list

8. **Test Form Validation**
   - Try to submit a form without required fields
   - Verify error messages appear
   - Try to submit invalid email
   - Verify email validation error appears

9. **Test Responsive Design**
   - Resize the browser window
   - Verify the layout adapts correctly
   - On mobile size, verify cards are displayed instead of table

## Error Testing

### 1. Invalid Email Test

```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "invalid-email"
  }'
```

Expected: Validation error response

### 2. Missing Required Fields

```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test"
  }'
```

Expected: Validation error response

### 3. Duplicate Email

```bash
# Create a student with an email
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test1",
    "lastName": "User1",
    "email": "duplicate@test.com"
  }'

# Try to create another student with the same email
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test2",
    "lastName": "User2",
    "email": "duplicate@test.com"
  }'
```

Expected: Email already exists error

### 4. Rate Limiting Test

```bash
# Make more than 100 requests in 15 minutes
for i in {1..110}; do
  curl http://localhost:5000/api/students
done
```

Expected: After 100 requests, receive rate limit error

## Security Testing

### 1. SQL Injection Protection
- Try searching with SQL injection patterns
- Verify they are safely handled

### 2. XSS Protection
- Try entering script tags in form fields
- Verify they are sanitized

### 3. CORS Testing
- Try making requests from a different origin
- Verify CORS headers are set correctly

## Performance Testing

### 1. Load Test with Multiple Students

Create a script to add multiple students and test the pagination and search performance.

### 2. Concurrent Requests

Test the API with multiple concurrent requests to ensure it handles load properly.

## Cleanup

After testing, you can delete test data:

```bash
# Delete all test students via MongoDB
mongosh student_management
db.students.deleteMany({ email: /test\.com$/ })
```

## Common Issues and Solutions

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running: `mongod` or `sudo systemctl start mongod`

2. **Port Already in Use**
   - Check if another process is using port 5000 or 3000
   - Change ports in .env files if needed

3. **CORS Errors**
   - Verify CLIENT_URL in server/.env matches your frontend URL
   - Check browser console for detailed CORS errors

4. **Rate Limit Errors**
   - Wait 15 minutes or restart the server to reset rate limits
   - Adjust rate limit settings in server.js if needed for testing
