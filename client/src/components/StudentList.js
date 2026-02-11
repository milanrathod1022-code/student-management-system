import React, { useState, useEffect } from 'react';
import * as studentService from '../services/studentService';

function StudentList({ onEdit, onView }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [searchTerm, statusFilter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;

      const response = await studentService.getAllStudents(params);
      setStudents(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await studentService.deleteStudent(id);
      setMessage({ type: 'success', text: 'Student deleted successfully' });
      fetchStudents();
      setDeleteConfirm(null);
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete student' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  if (error) {
    return <div className="message error">{error}</div>;
  }

  return (
    <div>
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="controls">
        <div className="controls-row">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select value={statusFilter} onChange={handleStatusFilter}>
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </select>
          </div>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="no-data">No students found</div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="student-list">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Enrollment Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{`${student.firstName} ${student.lastName}`}</td>
                    <td>{student.email}</td>
                    <td>{student.course || '-'}</td>
                    <td>{student.grade || '-'}</td>
                    <td>
                      <span className={`status-badge ${student.status}`}>
                        {student.status}
                      </span>
                    </td>
                    <td>{formatDate(student.enrollmentDate)}</td>
                    <td>
                      <div className="student-actions">
                        <button
                          className="action-btn view"
                          onClick={() => onView(student._id)}
                        >
                          View
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => onEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => setDeleteConfirm(student)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="student-cards">
            {students.map((student) => (
              <div key={student._id} className="student-card">
                <div className="student-card-header">
                  <div className="student-card-name">
                    {`${student.firstName} ${student.lastName}`}
                  </div>
                  <span className={`status-badge ${student.status}`}>
                    {student.status}
                  </span>
                </div>
                <div className="student-card-body">
                  <div className="student-card-field">
                    <strong>Email:</strong>
                    <span>{student.email}</span>
                  </div>
                  <div className="student-card-field">
                    <strong>Course:</strong>
                    <span>{student.course || '-'}</span>
                  </div>
                  <div className="student-card-field">
                    <strong>Grade:</strong>
                    <span>{student.grade || '-'}</span>
                  </div>
                  <div className="student-card-field">
                    <strong>Enrollment:</strong>
                    <span>{formatDate(student.enrollmentDate)}</span>
                  </div>
                </div>
                <div className="student-actions">
                  <button
                    className="action-btn view"
                    onClick={() => onView(student._id)}
                  >
                    View
                  </button>
                  <button
                    className="action-btn edit"
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => setDeleteConfirm(student)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete{' '}
                <strong>
                  {deleteConfirm.firstName} {deleteConfirm.lastName}
                </strong>
                ? This action cannot be undone.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(deleteConfirm._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
