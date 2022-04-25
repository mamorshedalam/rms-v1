const { update } = require('../model/Student');
const Student = require('../model/Student');

const createStudent = async (req, res) => {
     try {
          const result = await Student.create(req.body);
          res.status(200).json(result);
     } catch (err) { console.error(err) }
}
const getStudent = async (req, res) => {
     const { code, semester, currentSession } = req.query;

     try {
          const result = await Student.find({ $and: [{ 'department.code': code }, { 'semester': semester }, { 'currentSession': currentSession }] });
          res.status(200).json(result);
     } catch (err) { console.error(err) }
}
const findStudent = async (req, res) => {
     const { semester, roll, register } = req.query;

     try {
          const result = await Student.findOne({ $and: [{ 'semester': semester }, { 'roll': roll }, { 'register': register }] }).exec();
          res.status(200).json(result);
     } catch (err) { console.error(err) }
}

const deleteStudent = async (req, res) => {
     try {
          const result = await Student.deleteOne({ _id: req.body.id }).exec();
          res.status(200).json(result);
     } catch (err) {
          console.error(err)
     }
}

const updateStudent = (req, res) => {
     const updateData = req.body;

     updateData.forEach(async data => {
          const { roll, register, currentSession, admissionSession, semester, name, department } = data;

          const oldData = await Student.findOne({ $and: [{ 'roll': roll }, { 'register': register }] }).exec();

          oldData.roll = roll;
          oldData.register = register;
          oldData.currentSession = currentSession;
          oldData.admissionSession = admissionSession;
          oldData.semester = semester;
          oldData.name = name;
          oldData.department = department;

          try {
               const result = await oldData.save();
               res.status(200);
          } catch (err) { res.status(404).json(err) }
     })
}

module.exports = { createStudent, getStudent, findStudent, deleteStudent, updateStudent };