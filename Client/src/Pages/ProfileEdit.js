import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import StudentService from '../Services/StudentService';
import { toast } from 'react-toastify';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  const [personalData, setPersonalData] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    address: ''
  });

  const [academicData, setAcademicData] = useState({
    program: '',
    year: '',
    semester: '',
    gpa: '',
    enrolledCourses: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await StudentService.getStudentProfile();
      setProfile(data.profile);
      
      setPersonalData({
        name: data.profile.name || '',
        phone: data.profile.phone || '',
        dateOfBirth: data.profile.dateOfBirth ? data.profile.dateOfBirth.split('T')[0] : '',
        address: data.profile.address || ''
      });

      setAcademicData({
        program: data.profile.program || '',
        year: data.profile.year || '',
        semester: data.profile.semester || '',
        gpa: data.profile.gpa || '',
        enrolledCourses: data.profile.enrolledCourses ? data.profile.enrolledCourses.join(', ') : ''
      });
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  const handleAcademicChange = (e) => {
    setAcademicData({ ...academicData, [e.target.name]: e.target.value });
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await StudentService.updatePersonalDetails(personalData);
      toast.success('Personal details updated successfully');
      await fetchProfile();
    } catch (error) {
      toast.error(error.message || 'Failed to update personal details');
    } finally {
      setSaving(false);
    }
  };

  const handleAcademicSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToSubmit = {
        ...academicData,
        enrolledCourses: academicData.enrolledCourses
          .split(',')
          .map(course => course.trim())
          .filter(course => course !== ''),
        gpa: academicData.gpa ? parseFloat(academicData.gpa) : undefined
      };
      
      await StudentService.updateAcademicDetails(dataToSubmit);
      toast.success('Academic details updated successfully');
      await fetchProfile();
    } catch (error) {
      toast.error(error.message || 'Failed to update academic details');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await StudentService.uploadProfilePicture(file);
      toast.success('Profile picture uploaded successfully');
      await fetchProfile();
    } catch (error) {
      toast.error(error.message || 'Failed to upload profile picture');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-edit-container">
          <div className="loading">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-edit-container">
        <div className="edit-header">
          <h1>Edit Profile</h1>
          <button className="btn-cancel" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>

        <div className="edit-card">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Details
            </button>
            <button
              className={`tab ${activeTab === 'academic' ? 'active' : ''}`}
              onClick={() => setActiveTab('academic')}
            >
              Academic Details
            </button>
            <button
              className={`tab ${activeTab === 'picture' ? 'active' : ''}`}
              onClick={() => setActiveTab('picture')}
            >
              Profile Picture
            </button>
          </div>

          {activeTab === 'personal' && (
            <form onSubmit={handlePersonalSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={personalData.name}
                  onChange={handlePersonalChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={personalData.phone}
                  onChange={handlePersonalChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={personalData.dateOfBirth}
                  onChange={handlePersonalChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={personalData.address}
                  onChange={handlePersonalChange}
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'academic' && (
            <form onSubmit={handleAcademicSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="program">Program/Course</label>
                <input
                  type="text"
                  id="program"
                  name="program"
                  value={academicData.program}
                  onChange={handleAcademicChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={academicData.year}
                  onChange={handleAcademicChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <input
                  type="text"
                  id="semester"
                  name="semester"
                  value={academicData.semester}
                  onChange={handleAcademicChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gpa">GPA</label>
                <input
                  type="number"
                  id="gpa"
                  name="gpa"
                  value={academicData.gpa}
                  onChange={handleAcademicChange}
                  min="0"
                  max="4"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="enrolledCourses">
                  Enrolled Courses (comma-separated)
                </label>
                <textarea
                  id="enrolledCourses"
                  name="enrolledCourses"
                  value={academicData.enrolledCourses}
                  onChange={handleAcademicChange}
                  rows="3"
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'picture' && (
            <div className="picture-upload">
              {profile?.profilePicture && (
                <div className="current-picture">
                  <img src={profile.profilePicture} alt="Profile" />
                </div>
              )}
              <div className="upload-section">
                <label htmlFor="profilePicture" className="upload-label">
                  Choose Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <p className="upload-hint">
                  Supported formats: JPG, PNG, GIF (Max 5MB)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
