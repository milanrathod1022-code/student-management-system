import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import './index.css';

function App() {
  const [view, setView] = useState('list'); // 'list', 'add', 'edit', 'details'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleAddNew = () => {
    setSelectedStudent(null);
    setView('add');
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setView('edit');
  };

  const handleView = (studentId) => {
    setSelectedStudentId(studentId);
    setView('details');
  };

  const handleSuccess = () => {
    setView('list');
    setSelectedStudent(null);
    setSelectedStudentId(null);
  };

  const handleCancel = () => {
    setView('list');
    setSelectedStudent(null);
    setSelectedStudentId(null);
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedStudent(null);
    setSelectedStudentId(null);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🎓 Student Management System</h1>
        </div>
      </header>

      <div className="container">
        {view === 'list' && (
          <>
            <div style={{ marginBottom: '2rem' }}>
              <button className="btn btn-primary" onClick={handleAddNew}>
                + Add New Student
              </button>
            </div>
            <StudentList onEdit={handleEdit} onView={handleView} />
          </>
        )}

        {(view === 'add' || view === 'edit') && (
          <StudentForm
            student={selectedStudent}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        )}

        {view === 'details' && (
          <StudentDetails
            studentId={selectedStudentId}
            onBack={handleBackToList}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
