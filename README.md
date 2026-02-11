# Student Profile Management System

A comprehensive full-stack web application for managing student profiles with authentication, personal details, and academic information.

## 🚀 Features

- **User Authentication**
  - Secure registration and login with JWT tokens
  - Password hashing using bcrypt
  - Protected routes on both frontend and backend
  - Automatic token expiration handling

- **Student Dashboard**
  - Overview of student information
  - Quick stats (GPA, enrolled courses, program info)
  - Quick access to different sections

- **Personal Details Management**
  - View and edit personal information
  - Profile picture upload
  - Contact information management

- **Academic Details Management**
  - Track academic progress
  - Manage enrolled courses
  - View and update grades
  - GPA tracking

- **Profile Editing**
  - Intuitive tabbed interface
  - Separate sections for personal and academic details
  - Profile picture upload
  - Form validation

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **CSS3** - Styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Express Validator** - Request validation

## 📁 Project Structure

```
Student-Profile-Management/
├── Client/                          # Frontend React application
│   ├── Public/
│   │   └── index.html              # HTML template
│   ├── src/
│   │   ├── Components/             # Reusable components
│   │   │   ├── Login.js
│   │   │   ├── Login.css
│   │   │   ├── Signup.js
│   │   │   ├── Signup.css
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── Pages/                  # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── Dashboard.css
│   │   │   ├── PersonalDetails.js
│   │   │   ├── PersonalDetails.css
│   │   │   ├── AcademicDetails.js
│   │   │   ├── AcademicDetails.css
│   │   │   ├── ProfileEdit.js
│   │   │   └── ProfileEdit.css
│   │   ├── Services/               # API service layer
│   │   │   ├── AuthService.js
│   │   │   └── StudentService.js
│   │   ├── App.js                  # Main app component
│   │   ├── App.css
│   │   ├── index.js                # Entry point
│   │   └── index.css
│   └── package.json
├── Server/                          # Backend Express application
│   ├── Config/
│   │   ├── db.js                   # MongoDB connection
│   │   ├── auth.js                 # JWT configuration
│   │   └── .env.example            # Environment variables template
│   ├── Models/
│   │   └── User.js                 # User/Student model
│   ├── Controllers/
│   │   ├── authController.js       # Authentication logic
│   │   └── studentController.js    # Student operations
│   ├── Routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   └── studentRoutes.js        # Student endpoints
│   ├── Middleware/
│   │   ├── auth.js                 # JWT verification
│   │   ├── errorHandler.js         # Error handling
│   │   └── validator.js            # Request validation
│   └── Server.js                   # Express server setup
├── package.json                     # Root dependencies
└── README.md                        # Project documentation
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (v4.4 or higher)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/milanrathod1022-code/student-management-system.git
cd student-management-system
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd Client
npm install
cd ..
```

### 3. Set up environment variables

Create a `.env` file in the `Server/Config/` directory:
```bash
cp Server/Config/.env.example Server/Config/.env
```

Edit the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/student-profile-db
JWT_SECRET=your_secure_jwt_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux with systemd
sudo systemctl start mongod

# On Windows
# MongoDB should be running as a service
```

### 5. Run the application

#### Development Mode (Both servers concurrently)
```bash
npm run dev
```

#### Separate Servers

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔐 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Student Endpoints (Protected)

#### Get Student Profile
```http
GET /api/student/profile
Authorization: Bearer <token>
```

#### Update Personal Details
```http
PUT /api/student/personal
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+1234567890",
  "dateOfBirth": "2000-01-01",
  "address": "123 Main St"
}
```

#### Update Academic Details
```http
PUT /api/student/academic
Authorization: Bearer <token>
Content-Type: application/json

{
  "program": "Computer Science",
  "year": "3rd Year",
  "semester": "Fall 2024",
  "gpa": 3.8,
  "enrolledCourses": ["CS101", "MATH201", "PHYS101"]
}
```

#### Upload Profile Picture
```http
POST /api/student/profile-picture
Authorization: Bearer <token>
Content-Type: multipart/form-data

profilePicture: <file>
```

## 🧪 Testing

### Test Credentials
For testing purposes, you can create a new account or use:
- Register a new account through the signup page
- All passwords are securely hashed

### Sample Data
After registration, you can:
1. Login with your credentials
2. Navigate to Profile Edit to add personal and academic details
3. Upload a profile picture
4. View your dashboard with updated information

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes with middleware
- Input validation on both client and server
- CORS configuration
- Secure file upload handling
- XSS protection
- MongoDB injection prevention

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Author

Milan Rathod

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- All contributors and supporters

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

**Happy Coding! 🚀**