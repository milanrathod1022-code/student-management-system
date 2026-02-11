import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import StudentService from '../Services/StudentService';
import AuthService from '../Services/AuthService';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await StudentService.getStudentProfile();
      setProfile(data.profile);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <div className="loading">Loading...</div>
        </div>
      </>
    );
  }

  const enrolledCoursesCount = profile?.enrolledCourses?.length || 0;
  const gpa = profile?.gpa || 0;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1>Welcome, {user?.name || 'Student'}!</h1>
          <p>Here's an overview of your academic profile</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>GPA</h3>
              <p className="stat-value">{gpa.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>Enrolled Courses</h3>
              <p className="stat-value">{enrolledCoursesCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-info">
              <h3>Program</h3>
              <p className="stat-value">{profile?.program || 'Not Set'}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>Year/Semester</h3>
              <p className="stat-value">
                {profile?.year || 'N/A'} / {profile?.semester || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button
              className="action-btn"
              onClick={() => navigate('/personal-details')}
            >
              View Personal Details
            </button>
            <button
              className="action-btn"
              onClick={() => navigate('/academic-details')}
            >
              View Academic Details
            </button>
            <button
              className="action-btn"
              onClick={() => navigate('/profile-edit')}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {profile?.enrolledCourses && profile.enrolledCourses.length > 0 && (
          <div className="recent-activities">
            <h2>Enrolled Courses</h2>
            <ul className="courses-list">
              {profile.enrolledCourses.map((course, index) => (
                <li key={index} className="course-item">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
