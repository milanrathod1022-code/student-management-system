import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import StudentService from '../Services/StudentService';
import { toast } from 'react-toastify';
import './PersonalDetails.css';

const PersonalDetails = () => {
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

  const formatDate = (date) => {
    if (!date) return 'Not Set';
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="personal-details-container">
          <div className="loading">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="personal-details-container">
        <div className="details-header">
          <h1>Personal Details</h1>
          <button
            className="btn-edit"
            onClick={() => navigate('/profile-edit')}
          >
            Edit Profile
          </button>
        </div>

        <div className="details-card">
          {profile?.profilePicture && (
            <div className="profile-picture-section">
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            </div>
          )}

          <div className="details-grid">
            <div className="detail-item">
              <label>Full Name</label>
              <p>{profile?.name || 'Not Set'}</p>
            </div>

            <div className="detail-item">
              <label>Email</label>
              <p>{profile?.email || 'Not Set'}</p>
            </div>

            <div className="detail-item">
              <label>Student ID</label>
              <p>{profile?.studentId || 'Not Set'}</p>
            </div>

            <div className="detail-item">
              <label>Phone Number</label>
              <p>{profile?.phone || 'Not Set'}</p>
            </div>

            <div className="detail-item">
              <label>Date of Birth</label>
              <p>{formatDate(profile?.dateOfBirth)}</p>
            </div>

            <div className="detail-item full-width">
              <label>Address</label>
              <p>{profile?.address || 'Not Set'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
