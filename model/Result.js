const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
     roll: {
          type: Number,
          required: true,
     },
     register: {
          type: Number,
          required: true,
     },
     department: {
          type: Number,
          required: true,
     },
     semester: {
          type: Number,
          required: true,
     },
     admissionSession: {
          type: String,
          required: true,
     },
     remarks: {
          type: Number,
          required: true,
     },
     subject: {
          code: {
               type: Number,
               required: true,
          },
          name: {
               type: String,
               required: true,
          },
          marks: {
               type: Number,
               required: true,
          }
     }
});

module.exports = mongoose.model('Result', resultSchema);