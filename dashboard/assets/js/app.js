/* ========== VARIABLES ASSIGN ========== */
const addStudentsForm = document.getElementById('students-add-form');
const findStudentsForm = document.getElementById('find-students-form');
const addMarksFrom = document.getElementById("add-marks-form");
const studentTable = document.querySelector('#add-table tbody');
const markTable = document.querySelector('#mark-table tbody');
/* ========== MULTI USE VALUE ========== */
const DEPARTMENT_LIST = {
     664: "664 - CIVIL TECHNOLOGY",
     666: "666 - COMPUTER TECHNOLOGY",
     667: "667 - ELECTRICAL TECHNOLOGY",
     668: "668 - ELECTRONICS TECHNOLOGY",
     690: "690 - ENVIRONMENT TECHNOLOGY",
     670: "670 - MECHANICAL TECHNOLOGY",
     671: "671 - POWER TECHNOLOGY",
}
const SUCCESS_MESSAGE = "Data entering success."
const FAIL_MESSAGE = "Data entering fail."
/* ========== FUNCTION ========== */
const removeField = (parent, field) => {
     const removeRow = parent.querySelectorAll(field);
     for (let i = 1; i < removeRow.length; i++) {
          const row = removeRow[i];

          row.remove();
     }
}
const studentsArray = (roll, reg, sem, cSes, depCode, aSes, depName, name, fname, mname) => {
     let students = [];

     for (let i = 1; i < roll.length; i++) {
          const student = {
               roll: roll[i].value,
               register: reg[i].value,
               semester: sem.value,
               currentSession: cSes.value,
               admissionSession: aSes[i].value,
               department: {
                    code: depCode,
                    name: depName
               },
               name: {
                    name: name[i].value,
                    father: fname[i].value,
                    mother: mname[i].value
               }
          };

          const newStudent = [...students, student];
          students = newStudent;
     };
     return students;
}

const marksArray = (dept, sem, ses, name, code, full, roll, reg, obt) => {
     let marks = [];
     for (let i = 1; i < roll.length; i++) {
          const mark = {
               roll: roll[i].value,
               register: reg[i].value,
               department: dept[i].value,
               semester: sem[i].value,
               admissionSession: ses[i].value,
               remarks: obt[i].value,
               subject: {
                    code: code,
                    name: name,
                    marks: full
               }
          };
          const newMark = [...marks, mark];
          marks = newMark;
     };

     return marks;
}

const createAddTable = (dataArray) => {
     const tableRow = studentTable.querySelector('.upload-field');

     for (let i = 1; i < dataArray.length; i++) {
          let row = i;
          const student = dataArray[row];
          const newRow = tableRow.cloneNode(true);

          for (let j = 0; j < student.length; j++) {
               let column = j;
               const data = student[column];

               const newColumn = newRow.children[j];
               if (column > 0) {
                    const newInput = newColumn.children[0];
                    newInput.value = data;
               } else {
                    newColumn.innerText = row;
               }
          }

          studentTable.append(newRow);
     }
}

const createUpdateTable = (dataArray) => {
     const tableRow = studentTable.querySelector('.upload-field');

     removeField(studentTable, '.upload-field');

     dataArray.forEach(student => {
          const { register, roll, currentSession, name, _id } = student;
          const newRow = tableRow.cloneNode(true);
          newRow.setAttribute('name', _id);

          const addCount = newRow.children[0];
          const addRoll = newRow.children[1].querySelector('input');
          const addReg = newRow.children[2].querySelector('input');
          const addSes = newRow.children[3].querySelector('input');
          const addName = newRow.children[4].querySelector('input');
          const addFather = newRow.children[5].querySelector('input');
          const addMother = newRow.children[6].querySelector('input');

          addCount.innerText = dataArray.indexOf(student) + 1;
          addRoll.value = roll;
          addReg.value = register;
          addSes.value = currentSession;
          addName.value = name.name;
          addFather.value = name.father;
          addMother.value = name.mother;

          studentTable.append(newRow);
     })

}

const createMarksTable = (count, department, semester, cSession, roll, reg, mark = "") => {
     const markTableField = document.querySelector('.mark-field');
     let newField = markTableField.cloneNode(true);

     const markCount = newField.children[0];
     const departmentField = newField.children[1].querySelector('input');
     const semesterField = newField.children[2].querySelector('input');
     const sessionField = newField.children[3].querySelector('input');
     const rollField = newField.children[4].querySelector('input');
     const regField = newField.children[5].querySelector('input');
     const remarksField = newField.children[6].querySelector('input');
     remarksField.required = true;

     markCount.innerText = count + 1;
     departmentField.setAttribute('value', department);
     semesterField.setAttribute('value', semester);
     sessionField.setAttribute('value', cSession);
     rollField.setAttribute('value', roll);
     regField.setAttribute('value', reg);
     remarksField.setAttribute('value', mark);

     markTable.appendChild(newField);
}

/* ========== ONCLICK EVENT'S FUNCTION ========== */
function btnToggle(event, show, hide) {
     const sidebarBtn = document.getElementById("sidebar");
     event.preventDefault();

     for (let i = 0; i < sidebarBtn.children.length; i++) {
          sidebarBtn.children[i].classList.remove('active')
     }

     event.target.classList.add('active')

     document.getElementById(show).style.display = "block";
     document.getElementById(hide).style.display = "none";
}

function findInfo(event) {

     const departCode = document.getElementById("add-department").value;
     const semester = document.getElementById("add-semester").value;
     const cSession = document.getElementById("add-crt-session").value;

     if (departCode !== "" && semester !== "" && cSession !== "") {
          axios.get('/student/get', { params: { code: departCode, semester: semester, currentSession: cSession } })
               .then(({ data }) => { createUpdateTable(data) })
               .catch(err => { console.log(err); });


     } else { alert("Please enter data.") }
}

function deleteField(event, url) {
     const field = event.parentElement.parentElement;
     const fieldName = field.getAttribute('name');

     if (fieldName !== null) {
          axios.delete(url, { data: { id: fieldName } })
               .then(({ data }) => { alert(SUCCESS_MESSAGE) })
               .catch(error => { alert(FAIL_MESSAGE) });
     }
     field.remove();
}
/* ========== EVENT'S FUNCTION ========== */
function fileUpload(event) {
     removeField(studentTable, '.upload-field');

     const reader = new FileReader();
     reader.readAsArrayBuffer(event.target.files[0]);

     reader.onload = (event) => {
          const data = new Uint8Array(reader.result);
          const workBook = XLSX.read(data, { type: 'array' });

          const sheetName = workBook.SheetNames;
          const sheetData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]], { header: 1 });

          if (sheetData.length > 0) {
               createAddTable(sheetData);
          }
     }
}

const addStudents = (post) => {
     const departCode = document.getElementById("add-department").value;
     const semester = document.getElementById("add-semester");
     const crtSession = document.getElementById("add-crt-session");
     const roll = document.getElementsByClassName("add-roll");
     const register = document.getElementsByClassName("add-reg");
     const addSession = document.getElementsByClassName("add-add-session");
     const name = document.getElementsByClassName("add-name");
     const father = document.getElementsByClassName("add-father");
     const mother = document.getElementsByClassName("add-mother");
     const departName = DEPARTMENT_LIST[departCode];

     const students = studentsArray(roll, register, semester, crtSession, departCode, addSession, departName, name, father, mother);

     if (post) {
          axios.post('/student/post', students)
               .then(({ data }) => {
                    if (data.length > 0) { alert(SUCCESS_MESSAGE) }
               })
               .catch(err => { alert(FAIL_MESSAGE) });
     } else {
          axios.put('/student/put', students)
               .then(alert(SUCCESS_MESSAGE))
               .catch(err => { alert(FAIL_MESSAGE) });
     }

     removeField(studentTable, '.upload-field');
     addStudentsForm.reset();
}

const findStudents = (url) => {

     const findDepartment = document.getElementById("find-department").value;
     const findSemester = document.getElementById("find-semester").value;
     const findSession = document.getElementById("find-crt-session").value;

     if (url = '/student/get') {
          axios.get(url, { params: { code: findDepartment, semester: findSemester, currentSession: findSession } })
               .then(({ data }) => {
                    removeField(markTable, '.mark-field');
                    data.forEach(student => {
                         const { department, semester, admissionSession, roll, register, remarks } = student;
                         createMarksTable(data.indexOf(student), department.code, semester, admissionSession, roll, register, remarks);
                    })
               })
               .catch(err => { console.log(err); });
     } else {
          axios.get(url, { params: { code: findDepartment, semester: findSemester, currentSession: findSession } })
               .then(({ data }) => {
                    removeField(markTable, '.mark-field');
                    data.forEach(student => {
                         const { department, semester, admissionSession, roll, register, remarks } = student;
                         createMarksTable(data.indexOf(student), department, semester, admissionSession, roll, register, remarks);
                    })
               })
               .catch(err => { console.log(err); });
     }
}

const addMarks = (post) => {

     const subName = document.getElementById("subject-name").value;
     const subCode = document.getElementById("subject-code").value;
     const fullMarks = document.getElementById("full-marks").value;
     const department = document.getElementsByClassName("mark-department");
     const semester = document.getElementsByClassName("mark-semester");
     const addSession = document.getElementsByClassName("mark-add-session");
     const roll = document.getElementsByClassName("mark-roll");
     const register = document.getElementsByClassName("mark-reg");
     const obtMarks = document.getElementsByClassName("obt-mark");

     const marks = marksArray(department, semester, addSession, subName, subCode, fullMarks, roll, register, obtMarks);

     if (post) {
          axios.post('/result/post', marks)
               .then(({ data }) => {
                    if (data.length > 0) { alert(SUCCESS_MESSAGE); }
               })
               .catch(err => { alert(FAIL_MESSAGE) });
     } else {
          axios.put('/result/put', marks)
               .then(alert(SUCCESS_MESSAGE))
               .catch(err => { alert(FAIL_MESSAGE) });
     }

     removeField(markTable, '.mark-field');
     addMarksFrom.reset();
}
/* ========== EVENT LISTENER ========== */
document.getElementById('students-add-btn').onclick = function (event) {
     event.preventDefault();
     addStudents(true);
};
document.getElementById('students-update-btn').onclick = function (event) {
     event.preventDefault();
     addStudents(false);
};
document.getElementById('mark-add-btn').onclick = function (event) {
     event.preventDefault();
     addMarks(true);
}
document.getElementById('mark-update-btn').onclick = function (event) {
     event.preventDefault();
     addMarks(false);
}
document.getElementById('find-btn').onclick = function (event) {
     event.preventDefault();
     findStudents('student');
}
document.getElementById('update-mark-btn').onclick = function (event) {
     event.preventDefault();
     findStudents('/result/find_all');
}
document.getElementById("upload").addEventListener('change', fileUpload);