const express = require('express');
const router = express.Router();
const { createStudent, getStudent, findStudent, deleteStudent, updateStudent } = require('../../controllers/studentController');

router.post('/student/post', createStudent);
router.get('/student/get', getStudent);
router.get('/student/find', findStudent);
router.delete('/student/delete', deleteStudent);
router.put('/student/put', updateStudent);

module.exports = router