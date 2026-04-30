import React, { useState, useEffect } from 'react';

const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Data Science',
  'Artificial Intelligence',
];

function StudentForm({ initialData, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    department: '',
    year: '',
    email: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        rollNo: initialData.rollNo || '',
        department: initialData.department || '',
        year: initialData.year || '',
        email: initialData.email || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Ravi Kumar"
          required
        />
      </div>

      <div className="form-group">
        <label>Roll Number</label>
        <input
          type="text"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          placeholder="e.g. CS2024001"
          required
        />
      </div>

      <div className="form-group">
        <label>Department</label>
        <select name="department" value={formData.department} onChange={handleChange} required>
          <option value="">-- Select Department --</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Year</label>
        <select name="year" value={formData.year} onChange={handleChange} required>
          <option value="">-- Select Year --</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. ravi@college.edu"
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Student'}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
