const Result = require('../model/Result');

const createResult = async (req, res) => {
     try {
          const result = await Result.create(req.body);
          res.status(200).json(result);
     } catch (err) { console.error(err) }
}

const getResult = async (req, res) => {
     const { semester, roll, register } = req.query;

     try {
          const result = await Result.find({ $and: [{ 'semester': semester }, { 'roll': roll }, { 'register': register }] });
          res.status(200).json(result);
     } catch (err) { console.error(err) }
}

const getAllResult = async (req, res) => {
     const { code, semester, currentSession } = req.query;

     try {
          const result = await Result.find({ $and: [{ 'department': code }, { 'semester': semester }, { 'currentSession': currentSession }] });
          res.status(200).json(result);
     } catch (err) { console.error(err) }

}

const deleteResult = async (req, res) => {
     try {
          const result = await Student.deleteOne({ _id: req.body.id }).exec();
          res.status(200).json(result);
     } catch (err) {
          console.error(err)
     }
}

const updateResult = (req, res) => {
     const updateData = req.body;

     updateData.forEach(async data => {
          const { roll, register, semester, remarks, subject } = data;

          const oldData = await Result.findOne({ $and: [{ 'semester': semester }, { 'roll': roll }, { 'register': register }] }).exec();

          oldData.roll = roll;
          oldData.register = register;
          oldData.semester = semester;
          oldData.remarks = remarks;
          oldData.subject = subject;

          try {
               const result = await oldData.save();
               res.status(200);
          } catch (err) { res.status(404).json(err) }
     })
}

module.exports = { createResult, getResult, getAllResult, deleteResult, updateResult };