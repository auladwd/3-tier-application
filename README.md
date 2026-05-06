# 🎓 Student Management System — 3-Tier Web Application

A university assignment project demonstrating a **3-Tier Web Application
Architecture** using:

- **Frontend:** Next.js (React)
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB Atlas (Cloud)

---

## 📐 What is 3-Tier Architecture?

A 3-tier architecture separates an application into three independent layers.
Each tier has a specific responsibility and communicates only with the tier
directly adjacent to it.

```
┌─────────────────────────────────────────────────────────┐
│                  TIER 1: FRONTEND                        │
│              Next.js (runs on port 3000)                 │
│   - User Interface (pages, forms, tables)                │
│   - Sends HTTP requests to the Backend API               │
└────────────────────────┬────────────────────────────────┘
                         │  HTTP (fetch API)
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  TIER 2: BACKEND                         │
│             Express.js (runs on port 5000)               │
│   - REST API endpoints                                   │
│   - Business logic & validation                          │
│   - MVC pattern (models, controllers, routes)            │
└────────────────────────┬────────────────────────────────┘
                         │  Mongoose (MongoDB driver)
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  TIER 3: DATABASE                        │
│               MongoDB Atlas (Cloud)                      │
│   - Stores student records                               │
│   - Managed cloud database                               │
└─────────────────────────────────────────────────────────┘
```

### Tier 1 — Frontend (Presentation Layer)

The frontend is built with **Next.js**. It is what the user sees and interacts
with. It does NOT talk to the database directly — it only communicates with the
backend through HTTP API calls using the `fetch` API.

### Tier 2 — Backend (Application/Logic Layer)

The backend is built with **Express.js**. It receives requests from the
frontend, applies business logic (e.g., validation), and queries the database.
It follows the **MVC (Model-View-Controller)** pattern.

### Tier 3 — Database (Data Layer)

The database is **MongoDB Atlas**, a cloud-hosted NoSQL database. It stores all
student records. The backend connects to it using **Mongoose**, an ODM (Object
Data Modeling) library.

---

## 📁 Folder Structure

```
project-root/
│
├── frontend/                  # Tier 1 — Next.js Frontend
│   ├── components/
│   │   └── Navbar.js          # Shared navigation bar
│   ├── pages/
│   │   ├── _app.js            # App wrapper
│   │   ├── index.js           # Home page
│   │   ├── add-student.js     # Add student form
│   │   └── students.js        # Student list page
│   ├── styles/
│   │   └── globals.css        # Global CSS styles
│   ├── .env.example           # Frontend env variables template
│   ├── next.config.js
│   └── package.json
│
├── backend/                   # Tier 2 — Express.js Backend
│   ├── config/
│   │   └── db.js              # MongoDB connection setup
│   ├── controllers/
│   │   └── studentController.js  # Request handlers (business logic)
│   ├── models/
│   │   └── Student.js         # Mongoose schema/model
│   ├── routes/
│   │   ├── studentRoutes.js   # Student API routes
│   │   └── healthRoutes.js    # Health check route
│   ├── .env.example           # Backend env variables template
│   ├── server.js              # Entry point
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | /api/health   | Check if server is alive |
| GET    | /api/students | Get all students         |
| POST   | /api/students | Add a new student        |

### POST /api/students — Request Body

```json
{
  "name": "John Doe",
  "email": "john@university.edu",
  "department": "Computer Science"
}
```

---

## 🗄️ Database Schema

**Collection:** `students`

| Field      | Type   | Required | Notes                        |
| ---------- | ------ | -------- | ---------------------------- |
| name       | String | Yes      | Student full name            |
| email      | String | Yes      | Must be unique               |
| department | String | Yes      | Student's department         |
| createdAt  | Date   | Auto     | Added by Mongoose timestamps |
| updatedAt  | Date   | Auto     | Added by Mongoose timestamps |

---

## ⚙️ Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

---

### Step 1 — Get Your MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up / log in
2. Create a free cluster
3. Click **Connect** → **Drivers** → Copy the connection string
4. It looks like: `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/`

---

### Step 2 — Setup the Backend

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create your .env file from the example
cp .env.example .env
```

Edit `backend/.env` and fill in your values:

```
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/studentdb?retryWrites=true&w=majority
PORT=5000
```

---

### Step 3 — Setup the Frontend

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Create your .env file from the example
cp .env.example .env.local
```

The default `frontend/.env.local` content:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### Step 4 — Run the Application

Open **two terminal windows**:

**Terminal 1 — Start the Backend:**

```bash
cd backend
npm run dev
```

You should see:

```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
✅ Backend server running on http://localhost:5000
```

**Terminal 2 — Start the Frontend:**

```bash
cd frontend
npm run dev
```

You should see:

```
▲ Next.js ready on http://localhost:3000
```

---

### Step 5 — Open the App

Visit **http://localhost:3000** in your browser.

---

## 🧪 Test the API (Optional)

You can test the backend directly using curl or a tool like Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all students
curl http://localhost:5000/api/students

# Add a student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@uni.edu","department":"Computer Science"}'
```

---

## 🛠️ Tech Stack Summary

| Layer    | Technology    | Purpose                        |
| -------- | ------------- | ------------------------------ |
| Frontend | Next.js 14    | UI, routing, fetch API calls   |
| Backend  | Express.js 4  | REST API, business logic       |
| Database | MongoDB Atlas | Cloud NoSQL data storage       |
| ODM      | Mongoose 8    | Schema definition & DB queries |
| Env Vars | dotenv        | Secure configuration           |
| CORS     | cors package  | Cross-origin request handling  |

---

## 📝 Notes

- The frontend and backend run on **separate ports** (3000 and 5000). CORS is
  enabled on the backend to allow this.
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
  in Next.js.
- Never commit your `.env` files to version control. They are listed in
  `.gitignore`.
