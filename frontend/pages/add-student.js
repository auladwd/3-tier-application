// ============================================================
// pages/add-student.js - Add Student Page
// Contains a form to submit a new student to the backend API
// ============================================================

import { useState } from 'react';
import Navbar from '../components/Navbar';

// List of departments for the dropdown
const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Mathematics',
  'Physics',
];

export default function AddStudent() {
  // Form field state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle input changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMsg('');
    setErrorMsg('');
    setLoading(true);

    try {
      // POST request to the backend API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/students`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        // Show error from backend
        setErrorMsg(data.message || 'Failed to add student');
      } else {
        // Success: clear form and show success message
        setSuccessMsg(`Student "${data.name}" added successfully!`);
        setFormData({ name: '', email: '', department: '' });
      }
    } catch (error) {
      // Network or unexpected error
      setErrorMsg('Cannot connect to the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>➕ Add New Student</h2>

          {/* Success Message */}
          {successMsg && (
            <div className="alert alert-success">{successMsg}</div>
          )}

          {/* Error Message */}
          {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

          {/* Student Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. john@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Department Dropdown */}
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Department --</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Add Student'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
