const express = require('express');
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// POST   /api/students       - Create student
// GET    /api/students       - Get all students
router.route('/').post(createStudent).get(getAllStudents);

// GET    /api/students/:id   - Get single student
// PUT    /api/students/:id   - Update student
// DELETE /api/students/:id   - Delete student
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent);

module.exports = router;
