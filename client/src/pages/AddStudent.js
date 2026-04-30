import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { createStudent } from '../components/api';

function AddStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      await createStudent(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student.');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title" style={{ marginBottom: 0 }}>
          Add <span>Student</span>
        </h1>
        <Link to="/" className="btn btn-secondary">
          ← Back
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-card">
        <StudentForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}

export default AddStudent;
