// ============================================================
// pages/students.js - Student List Page
// Fetches and displays all students from the backend API
// ============================================================

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      // GET request to the backend API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/students`,
      );

      if (!res.ok) {
        throw new Error('Failed to fetch students from server');
      }

      const data = await res.json();
      setStudents(data);
    } catch (error) {
      setErrorMsg('Cannot connect to the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // Format date to a readable string
  const formatDate = dateStr => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>📋 All Students ({students.length})</h2>

          {/* Error Message */}
          {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

          {/* Loading State */}
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading students...</p>
            </div>
          ) : students.length === 0 ? (
            /* Empty State */
            <div className="empty-state">
              <p>No students found.</p>
              <br />
              <Link
                href="/add-student"
                className="btn btn-primary"
                style={{ width: 'auto' }}
              >
                + Add First Student
              </Link>
            </div>
          ) : (
            /* Students Table */
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        <span className="badge">{student.department}</span>
                      </td>
                      <td>{formatDate(student.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Refresh Button */}
          {!loading && (
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={fetchStudents}
                className="btn btn-outline"
                style={{ width: 'auto' }}
              >
                🔄 Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
