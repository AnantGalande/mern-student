import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllStudents, deleteStudent } from '../components/api';

function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getAllStudents();
      setStudents(res.data);
    } catch (err) {
      setError('Failed to fetch students. Check server connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete student "${name}"? This cannot be undone.`)) return;
    try {
      await deleteStudent(id);
      setSuccessMsg(`"${name}" deleted successfully.`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError('Failed to delete student.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const yearLabel = (y) => ['', '1st', '2nd', '3rd', '4th'][y] || y;

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title" style={{ marginBottom: 0 }}>
          All <span>Students</span>
        </h1>
        <Link to="/add" className="btn btn-primary">
          + Add Student
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-chip">
          <strong>{students.length}</strong> Total Students
        </div>
        <div className="stat-chip">
          <strong>{new Set(students.map((s) => s.department)).size}</strong> Departments
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {loading ? (
        <div className="loading">Loading students...</div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <h3>No students found</h3>
          <p>Click "Add Student" to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Year</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student._id}>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{idx + 1}</td>
                  <td style={{ fontWeight: 500 }}>{student.name}</td>
                  <td>
                    <span className="roll-badge">{student.rollNo}</span>
                  </td>
                  <td>{student.department}</td>
                  <td>
                    <span className="year-badge">Year {yearLabel(student.year)}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{student.email}</td>
                  <td>
                    <div className="action-btns">
                      <Link to={`/student/${student._id}`} className="btn btn-view">
                        View
                      </Link>
                      <Link to={`/edit/${student._id}`} className="btn btn-edit">
                        Edit
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(student._id, student.name)}
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
      )}
    </div>
  );
}

export default Home;
