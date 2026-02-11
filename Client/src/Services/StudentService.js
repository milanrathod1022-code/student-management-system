import axios from 'axios';
import AuthService from './AuthService';

const API_URL = '/api/student';

// Create axios instance with auth header
const getAuthHeader = () => {
  const token = AuthService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

class StudentService {
  // Get student profile
  async getStudentProfile() {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  }

  // Update personal details
  async updatePersonalDetails(data) {
    try {
      const response = await axios.put(`${API_URL}/personal`, data, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update personal details' };
    }
  }

  // Update academic details
  async updateAcademicDetails(data) {
    try {
      const response = await axios.put(`${API_URL}/academic`, data, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update academic details' };
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file) {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      const response = await axios.post(`${API_URL}/profile-picture`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload profile picture' };
    }
  }
}

export default new StudentService();
