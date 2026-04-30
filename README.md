# Student Record Management System (MERN)

A cloud-based Student Record Management System built with the MERN stack.

---

## 🗂 Project Structure

```
student-record-system/
│
├── server/
│   ├── models/
│   │   └── Student.js          # Mongoose schema
│   ├── routes/
│   │   └── studentRoutes.js    # Express routes
│   ├── controllers/
│   │   └── studentController.js # CRUD logic
│   └── server.js               # Entry point
│
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── StudentForm.js
│   │   │   └── api.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── AddStudent.js
│   │   │   ├── EditStudent.js
│   │   │   └── StudentDetail.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Frontend   | React.js             |
| Backend    | Node.js + Express.js |
| Database   | MongoDB Atlas        |
| ODM        | Mongoose             |
| HTTP Client| Axios                |

---

## 🔌 REST API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| POST   | `/api/students`       | Create a student     |
| GET    | `/api/students`       | Get all students     |
| GET    | `/api/students/:id`   | Get single student   |
| PUT    | `/api/students/:id`   | Update a student     |
| DELETE | `/api/students/:id`   | Delete a student     |

---

## 🚀 Local Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd student-record-system
```

### 2. Set up environment variables
```bash
# Edit .env file
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studentdb
PORT=3000
```

### 3. Install backend dependencies
```bash
npm install
```

### 4. Install and build frontend
```bash
cd client && npm install
npm run build
cd ..
```

### 5. Start the server
```bash
node server/server.js
```

Open: `http://localhost:3000`

---

## ☁️ AWS EC2 Deployment

### Prerequisites
- Ubuntu EC2 instance (t2.micro or higher)
- Node.js 18+ installed
- Port 3000 open in Security Group

### Steps

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Clone the project
git clone <your-repo-url>
cd student-record-system

# 4. Create .env file
nano .env
# Add MONGO_URI and PORT=3000

# 5. Install backend dependencies
npm install

# 6. Build frontend
cd client && npm install && npm run build && cd ..

# 7. Start server
node server/server.js

# OR use PM2 for production:
sudo npm install -g pm2
pm2 start server/server.js --name srs
pm2 save
pm2 startup
```

Access app at: `http://<EC2-PUBLIC-IP>:3000`

---

## 📊 Student Schema

```javascript
{
  name:       String  (required),
  rollNo:     String  (required, unique),
  department: String  (required),
  year:       Number  (1–4, required),
  email:      String  (required, unique),
  createdAt:  Date    (auto),
  updatedAt:  Date    (auto)
}
```

---

## 📌 Features

- ✅ Add Student
- ✅ View All Students (table)
- ✅ View Single Student (detail page)
- ✅ Update Student
- ✅ Delete Student (with confirmation)
- ✅ Stats bar (total students, departments)
- ✅ Express serves React build (single port)
