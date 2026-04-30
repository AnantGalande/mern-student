import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { getStudentById, updateStudent } from '../components/api';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudentById(id);
        setStudent(res.data);
      } catch (err) {
        setError('Student not found.');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      await updateStudent(id, formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student.');
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="loading">Loading student data...</div>;

  return (
    <div>
      <div className="top-bar">
        <h1 className="page-title" style={{ marginBottom: 0 }}>
          Edit <span>Student</span>
        </h1>
        <Link to="/" className="btn btn-secondary">
          ← Back
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-card">
        <StudentForm initialData={student} onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}

export default EditStudent;
