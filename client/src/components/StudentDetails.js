import React, { useState, useEffect, useCallback } from 'react';
import * as studentService from '../services/studentService';

function StudentDetails({ studentId, onBack, onEdit }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentService.getStudentById(studentId);
      setStudent(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch student details');
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="loading">Loading student details...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="message error">{error}</div>
        <button className="btn btn-secondary" onClick={onBack}>
          Back to List
        </button>
      </div>
    );
  }

  if (!student) {
    return <div className="no-data">Student not found</div>;
  }

  return (
    <div className="student-details">
      <div className="details-header">
        <h2>
          {student.firstName} {student.lastName}
        </h2>
        <div>
          <span className={`status-badge ${student.status}`}>
            {student.status}
          </span>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <div className="detail-label">First Name</div>
          <div className="detail-value">{student.firstName}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Last Name</div>
          <div className="detail-value">{student.lastName}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Email</div>
          <div className="detail-value">{student.email}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Age</div>
          <div className="detail-value">{student.age || 'N/A'}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Course</div>
          <div className="detail-value">{student.course || 'N/A'}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Grade</div>
          <div className="detail-value">{student.grade || 'N/A'}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Phone</div>
          <div className="detail-value">{student.phone || 'N/A'}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Enrollment Date</div>
          <div className="detail-value">
            {formatDate(student.enrollmentDate)}
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Created At</div>
          <div className="detail-value">{formatDate(student.createdAt)}</div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Last Updated</div>
          <div className="detail-value">{formatDate(student.updatedAt)}</div>
        </div>
      </div>

      {student.address && (
        <div className="detail-item" style={{ marginTop: '1.5rem' }}>
          <div className="detail-label">Address</div>
          <div className="detail-value">{student.address}</div>
        </div>
      )}

      <div className="form-actions" style={{ marginTop: '2rem' }}>
        <button className="btn btn-primary" onClick={() => onEdit(student)}>
          Edit Student
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          Back to List
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;
