const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
     roll: {
          type: Number,
          required: true,
     },
     register: {
          type: Number,
          required: true,
     },
     semester: {
          type: Number,
          required: true,
     },
     currentSession: {
          type: String,
          required: true,
     },
     admissionSession: {
          type: String,
          required: true,
     },
     department: {
          code: {
               type: Number,

               required: true,
          },
          name: {
               type: String,

               required: true,
          },
     },
     name: {
          name: {
               type: String,

               required: true,
          },
          father: {
               type: String,

               required: true,
          },
          mother: {
               type: String,
               required: true,
          },
     }
});

module.exports = mongoose.model('Student', studentSchema);