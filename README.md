# 🎓 Student Management System

A full-stack web application for managing student records, built with React, Node.js/Express, and MongoDB.

## 📋 Features

- **Student Management**: Create, read, update, and delete student records
- **Search & Filter**: Search students by name, email, or course, and filter by status
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Validation**: Form validation on both frontend and backend
- **RESTful API**: Well-structured API endpoints following REST principles
- **Modern UI**: Clean and intuitive user interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- React 18
- Axios for API calls
- CSS3 with responsive design
- React Hooks (useState, useEffect)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- Express Validator for input validation
- Helmet for security
- CORS for cross-origin requests

## 📁 Project Structure

```
student-management-system/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentList.js
│   │   │   ├── StudentForm.js
│   │   │   └── StudentDetails.js
│   │   ├── services/
│   │   │   └── studentService.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env.example
├── server/                # Node.js backend
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── controllers/
│   │   └── studentController.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/milanrathod1022-code/student-management-system.git
cd student-management-system
```

2. **Set up the Backend**

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/student_management
CLIENT_URL=http://localhost:3000
```

3. **Set up the Frontend**

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start MongoDB**
```bash
# Make sure MongoDB is running on your system
mongod
```

2. **Start the Backend Server**
```bash
cd server
npm start
# Or for development with auto-restart:
npm run dev
```

The server will start on `http://localhost:5000`

3. **Start the Frontend**

Open a new terminal:
```bash
cd client
npm start
```

The React app will start on `http://localhost:3000`

4. **(Optional) Seed Sample Data**

To populate the database with sample student data for testing:
```bash
cd server
npm run seed
```

This will create 8 sample students with different courses and statuses.

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Students
```http
GET /students
```

Query Parameters:
- `search` (optional): Search by name, email, or course
- `status` (optional): Filter by status (active, inactive, graduated)
- `sort` (optional): Sort by field (e.g., firstName, -createdAt)

Response:
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

#### Get Single Student
```http
GET /students/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    ...
  }
}
```

#### Create Student
```http
POST /students
```

Request Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "age": 20,
  "grade": "A",
  "course": "Computer Science",
  "phone": "1234567890",
  "address": "123 Main St",
  "status": "active"
}
```

Response:
```json
{
  "success": true,
  "data": {...},
  "message": "Student created successfully"
}
```

#### Update Student
```http
PUT /students/:id
```

Request Body: (same as Create Student)

Response:
```json
{
  "success": true,
  "data": {...},
  "message": "Student updated successfully"
}
```

#### Delete Student
```http
DELETE /students/:id
```

Response:
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {}
}
```

### Error Responses

All endpoints return error responses in the following format:
```json
{
  "success": false,
  "message": "Error message here",
  "errors": [...] // Optional validation errors
}
```

## 🗄️ Database Schema

### Student Model

```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  age: Number (optional, 1-150),
  grade: String (optional),
  course: String (optional),
  phone: String (optional),
  address: String (optional),
  enrollmentDate: Date (default: now),
  status: String (enum: ['active', 'inactive', 'graduated'], default: 'active'),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🎨 Features in Detail

### Frontend Features

1. **Student List View**
   - Displays all students in a responsive table (desktop) or cards (mobile)
   - Real-time search functionality
   - Status filtering
   - Action buttons for view, edit, and delete

2. **Add/Edit Student Form**
   - Comprehensive form with all student fields
   - Client-side validation
   - Error messages for invalid inputs
   - Success feedback

3. **Student Details View**
   - Detailed view of individual student
   - Formatted dates
   - Quick access to edit

4. **Delete Confirmation**
   - Modal confirmation before deletion
   - Prevents accidental deletions

### Backend Features

1. **RESTful API**
   - Standard HTTP methods
   - Consistent response format
   - Proper status codes

2. **Validation**
   - Express Validator for input validation
   - Mongoose schema validation
   - Custom validation rules

3. **Error Handling**
   - Centralized error handling
   - Detailed error messages
   - Development vs production error responses

4. **Security**
   - Helmet for HTTP headers
   - CORS configuration
   - Input sanitization

## 🔒 Security Considerations

- Input validation on both frontend and backend
- Email uniqueness constraint
- Helmet.js for security headers
- CORS configuration to prevent unauthorized access
- Rate limiting (100 requests per 15 minutes per IP)
- Environment variables for sensitive data
- Updated dependencies to patch known vulnerabilities
- Protection against prototype pollution
- Protection against NoSQL injection attacks

## 🧪 Testing

For detailed testing instructions and test cases, see [TESTING.md](TESTING.md).

To test the API endpoints, you can use tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)

Example cURL request:
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 20,
    "course": "Computer Science",
    "status": "active"
  }'
```

## 📝 Environment Variables

### Server (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/student_management
CLIENT_URL=http://localhost:3000
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Milan Rathod

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the backend framework
- MongoDB for the database
- All contributors and supporters