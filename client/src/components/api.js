import axios from 'axios';

const API_BASE = '/api/students';

// Get all students
export const getAllStudents = () => axios.get(API_BASE);

// Get single student
export const getStudentById = (id) => axios.get(`${API_BASE}/${id}`);

// Create student
export const createStudent = (data) => axios.post(API_BASE, data);

// Update student
export const updateStudent = (id, data) => axios.put(`${API_BASE}/${id}`, data);

// Delete student
export const deleteStudent = (id) => axios.delete(`${API_BASE}/${id}`);
