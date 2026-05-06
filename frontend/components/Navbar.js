// ============================================================
// components/Navbar.js - Navigation bar component
// Shared across all pages
// ============================================================

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        🎓 Student Management System
      </Link>
      <ul className="navbar-links">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/add-student">Add Student</Link>
        </li>
        <li>
          <Link href="/students">Student List</Link>
        </li>
      </ul>
    </nav>
  );
}
