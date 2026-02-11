import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import StudentService from '../Services/StudentService';
import { toast } from 'react-toastify';
import './AcademicDetails.css';

const AcademicDetails = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <div className="academic-details-container">
          <div className="loading">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="academic-details-container">
        <div className="details-header">
          <h1>Academic Details</h1>
          <button
            className="btn-edit"
            onClick={() => navigate('/profile-edit')}
          >
            Edit Profile
          </button>
        </div>

        <div className="details-card">
          <h2>Academic Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <label>Student ID</label>
              <p>{profile?.studentId || 'Not Set'}</p>
            </div>

            <div className="detail-item">
              <label>Program/Course</label>
              <p>{profile?.program || 'Not Set'}</p>
            </div>

            <div className="detail-item">
              <label>Year</label>
              <p>{profile?.year || 'Not Set'}</p>
            </div>

            <div className="detail-item">
              <label>Semester</label>
              <p>{profile?.semester || 'Not Set'}</p>
            </div>

            <div className="detail-item">
              <label>GPA</label>
              <p>{profile?.gpa ? profile.gpa.toFixed(2) : 'Not Set'}</p>
            </div>
          </div>

          {profile?.enrolledCourses && profile.enrolledCourses.length > 0 && (
            <div className="courses-section">
              <h3>Enrolled Courses</h3>
              <ul className="courses-list">
                {profile.enrolledCourses.map((course, index) => (
                  <li key={index} className="course-item">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile?.grades && profile.grades.length > 0 && (
            <div className="grades-section">
              <h3>Grades</h3>
              <div className="grades-table">
                <table>
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Grade</th>
                      <th>Credits</th>
                      <th>Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.grades.map((grade, index) => (
                      <tr key={index}>
                        <td>{grade.course}</td>
                        <td>{grade.grade}</td>
                        <td>{grade.credits}</td>
                        <td>{grade.semester}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(!profile?.enrolledCourses || profile.enrolledCourses.length === 0) &&
            (!profile?.grades || profile.grades.length === 0) && (
              <div className="no-data">
                <p>No academic records found. Please update your profile.</p>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default AcademicDetails;
