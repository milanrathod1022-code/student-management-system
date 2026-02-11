# Quick Start Guide

This guide will help you get the Student Profile Management System up and running quickly.

## Prerequisites

Ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## Quick Setup

### 1. Install Dependencies

```bash
# Install all dependencies (root, client, and server)
npm run install-all
```

Or install separately:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd Client
npm install
cd ..
```

### 2. Configure Environment

```bash
# Copy the example env file
cp Server/Config/.env.example Server/Config/.env
```

Edit `Server/Config/.env` with your settings:
```env
MONGODB_URI=mongodb://localhost:27017/student-profile-db
JWT_SECRET=your_very_secure_random_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a strong, random string!

### 3. Start MongoDB

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux (systemd):**
```bash
sudo systemctl start mongod
```

**Windows:**
MongoDB should start automatically as a service. If not, start it manually from Services.

**Docker (Alternative):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Run the Application

**Option A: Development Mode (Recommended)**
```bash
# Runs both client and server concurrently
npm run dev
```

**Option B: Separate Terminals**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## First-Time Usage

1. **Register a New Account**
   - Go to http://localhost:3000
   - You'll be redirected to the login page
   - Click "Sign up here"
   - Fill in your details and register

2. **Login**
   - Use your registered email and password
   - You'll be redirected to the dashboard

3. **Complete Your Profile**
   - Click "Edit Profile" or navigate to Profile Edit
   - Add personal details (phone, DOB, address)
   - Add academic details (program, GPA, courses)
   - Upload a profile picture

4. **Explore Features**
   - Dashboard: View your overview
   - Personal Details: See your personal information
   - Academic Details: View your academic records
   - Navbar: Quick navigation between pages

## Common Commands

```bash
# Install dependencies
npm run install-all

# Start development (both servers)
npm run dev

# Start backend only
npm run server
npm start

# Start frontend only
npm run client

# Build frontend for production
cd Client && npm run build
```

## Troubleshooting

### MongoDB Connection Error
**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
1. Verify MongoDB is running: `mongosh` or `mongo`
2. Check MongoDB status:
   - macOS: `brew services list | grep mongodb`
   - Linux: `sudo systemctl status mongod`
3. Start MongoDB if not running (see step 3 above)

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change PORT in `.env` file
2. Or kill the process using the port:
   ```bash
   # Find process
   lsof -i :5000
   # Kill process
   kill -9 <PID>
   ```

### JWT Secret Error
**Problem:** `JWT_SECRET must be defined in production environment`

**Solution:** 
1. Create `Server/Config/.env` file if missing
2. Add `JWT_SECRET=your_secure_secret_here`

### CORS Errors
**Problem:** `Access to fetch at 'http://localhost:5000' blocked by CORS`

**Solution:**
1. Ensure backend is running on port 5000
2. Verify `CLIENT_URL` in `.env` is set to `http://localhost:3000`
3. Restart the server

### npm Install Errors
**Problem:** Dependency installation fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Same for client
cd Client
rm -rf node_modules package-lock.json
npm install
```

## API Testing

You can test the API endpoints using curl or Postman:

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Save the token from the response and use it for authenticated requests:

### Get Profile
```bash
curl http://localhost:5000/api/student/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use a strong, random JWT_SECRET
3. Use a production MongoDB instance (MongoDB Atlas recommended)
4. Build the frontend: `cd Client && npm run build`
5. Serve the frontend build folder with the backend
6. Use a process manager like PM2
7. Set up HTTPS with SSL certificates
8. Configure firewall rules
9. Set up monitoring and logging

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review [SECURITY.md](SECURITY.md) for security information
- Check the [API documentation](README.md#-api-documentation) section
- Create an issue in the repository

---

**Happy coding! 🚀**
