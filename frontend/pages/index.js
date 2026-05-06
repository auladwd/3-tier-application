// ============================================================
// pages/index.js - Home Page
// Displays a welcome message and explains the 3-tier architecture
// ============================================================

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="container">
        {/* Hero Section */}
        <div className="hero">
          <h1>Student Management System</h1>
          <p>
            A 3-Tier Web Application built with Next.js, Express.js, and MongoDB
            Atlas
          </p>
          <div className="hero-buttons">
            <Link href="/add-student" className="btn btn-primary">
              + Add Student
            </Link>
            <Link href="/students" className="btn btn-outline">
              View All Students
            </Link>
          </div>
        </div>

        {/* 3-Tier Architecture Overview */}
        <div className="card">
          <h2>📐 3-Tier Architecture</h2>
          <div className="tier-grid">
            {/* Tier 1 */}
            <div className="tier-card">
              <div className="tier-icon">🖥️</div>
              <h3>Frontend Tier</h3>
              <p>
                Built with <strong>Next.js</strong>. Handles the user interface,
                form inputs, and displays data fetched from the backend API.
              </p>
            </div>

            {/* Tier 2 */}
            <div className="tier-card">
              <div className="tier-icon">⚙️</div>
              <h3>Backend Tier</h3>
              <p>
                Built with <strong>Express.js</strong>. Provides REST API
                endpoints, handles business logic, and communicates with the
                database.
              </p>
            </div>

            {/* Tier 3 */}
            <div className="tier-card">
              <div className="tier-icon">🗄️</div>
              <h3>Database Tier</h3>
              <p>
                Powered by <strong>MongoDB Atlas</strong>. Stores all student
                records in the cloud using Mongoose schemas.
              </p>
            </div>
          </div>
        </div>

        {/* API Endpoints Info */}
        <div className="card">
          <h2>🔌 API Endpoints</h2>
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="badge">GET</span>
                </td>
                <td>/api/health</td>
                <td>Check if the backend is running</td>
              </tr>
              <tr>
                <td>
                  <span className="badge">GET</span>
                </td>
                <td>/api/students</td>
                <td>Retrieve all students</td>
              </tr>
              <tr>
                <td>
                  <span className="badge">POST</span>
                </td>
                <td>/api/students</td>
                <td>Add a new student</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
