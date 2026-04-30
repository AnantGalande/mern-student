import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getStudentById, deleteStudent } from '../components/api';

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudentById(id);
        setStudent(res.data);
      } catch (err) {
        setError('Student not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${student.name}"? This cannot be undone.`)) return;
    try {
      await deleteStudent(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete student.');
    }
  };

  const yearLabel = (y) => ['', '1st', '2nd', '3rd', '4th'][y] || y;

  if (loading) return <div className="loading">Loading student...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title" style={{ marginBottom: 0 }}>
          Student <span>Detail</span>
        </h1>
        <Link to="/" className="btn btn-secondary">
          ← Back
        </Link>
      </div>

      {student && (
        <div className="detail-card">
          <div className="detail-row">
            <span className="detail-label">Name</span>
            <span className="detail-value" style={{ fontWeight: 600 }}>
              {student.name}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Roll No</span>
            <span className="detail-value">
              <span className="roll-badge">{student.rollNo}</span>
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Department</span>
            <span className="detail-value">{student.department}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Year</span>
            <span className="detail-value">
              <span className="year-badge">{yearLabel(student.year)} Year</span>
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{student.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Created</span>
            <span className="detail-value" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {new Date(student.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="form-actions" style={{ marginTop: '1.5rem' }}>
            <Link to={`/edit/${student._id}`} className="btn btn-edit">
              ✏ Edit
            </Link>
            <button className="btn btn-delete" onClick={handleDelete}>
              🗑 Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetail;
