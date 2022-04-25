/* ========== VARIABLES ASSIGN ========== */
const wrapperSection = document.getElementById('main-wrapper');
const searchResultForm = document.getElementById("search-form");
const resultSection = document.getElementById("result");

/* ========== MULTI USE VALUE ========== */
let verify;
const SEMESTER_LIST = {
     1: "FIRST",
     2: "SECOND",
     3: "THIRD",
     4: "FOURTH",
     5: "FIFTH",
     6: "SIXTH",
     7: "SEVENTH"
}


/* ========== FUNCTION ========== */

const gradeGenerator = (total, obtained) => {
     remark = parseInt((obtained / 100) * total);
     let point;
     let letter;
     switch (true) {
          case obtained >= 80:
               point = 4.00;
               letter = "A+";
               break;
          case obtained >= 75:
               point = 3.75;
               letter = "A";
               break;
          case obtained >= 70:
               point = 3.50;
               letter = "A-";
               break;
          case obtained >= 65:
               point = 3.25;
               letter = "B+";
               break;
          case obtained >= 60:
               point = 3.00;
               letter = "B";
               break;
          case obtained >= 55:
               point = 2.75;
               letter = "B-";
               break;
          case obtained >= 50:
               point = 2.50;
               letter = "C+";
               break;
          case obtained >= 45:
               point = 2.25;
               letter = "C";
               break;
          case obtained >= 40:
               point = 2.00;
               letter = "D";
               break;
          default:
               point = 0.00;
               letter = "F";
     }
     return { point, letter };
}

const totalGPA = (points) => {
     let total = 0;

     for (let i = 0; i < points.length; i++) {
          const point = points[i];
          total += point;
     }

     return parseFloat(total / points.length).toFixed(2);
}

const showResult = (result) => {
     const resultTable = document.querySelector('#result-table tbody');
     let gpa = [];

     result.forEach(sub => {
          const { remarks, subject } = sub;
          const grade = gradeGenerator(subject.marks, remarks);

          if (grade.point === 0) {
               resultSection.style.color = 'red';
               resultSection.innerHTML = `<h4>You fail</h4>`;
          } else {
               wrapperSection.style.cssText = `height: 100%;display: block;`;
               resultSection.style.display = 'flex';

               const newGPA = [...gpa, grade.point];
               gpa = newGPA;

               const createTr = document.createElement('tr');
               createTr.innerHTML = `<tr>
                                        <td>1</td>
                                        <td>${subject.code}</td>
                                        <td>${subject.name}</td>
                                        <td>${subject.marks}</td>
                                        <td>${remarks}</td>
                                        <td>${grade.letter}</td>
                                        <td>${grade.point}</td>
                                   </tr>`;

               resultTable.appendChild(createTr);
          }
     })

     const total = totalGPA(gpa);

     const lastTr = document.createElement('tr');
     lastTr.innerHTML = `<tr>
                              <td colspan="2">Remarks</td>
                              <td colspan="3">Passed</td>
                              <td>GPA</td>
                              <td>${total}</td>
                         </tr>`;
     resultTable.appendChild(lastTr);
}

const showProfile = (profile) => {
     const { roll, register, semester, admissionSession, department, name } = profile;
     const studentTech = document.getElementById("student-tech");
     const studentName = document.getElementById("student-name");
     const studentFather = document.getElementById("student-father");
     const studentMother = document.getElementById("student-mother");
     const studentRoll = document.getElementById("student-roll");
     const studentReg = document.getElementById("student-register");
     const studentSes = document.getElementById("student-session");
     const studentSem = document.getElementById("student-semester");
     const studentSemester = SEMESTER_LIST[semester];

     studentSem.innerHTML = studentSemester;
     studentTech.innerText = department.name;
     studentName.innerText = name.name;
     studentFather.innerText = name.father;
     studentMother.innerText = name.mother;
     studentRoll.innerText = roll;
     studentReg.innerText = register;
     studentSes.innerText = admissionSession;
}

/* ========== ONCLICK EVENT'S FUNCTION ========== */
function resultPrint(event) {
     event.preventDefault();
     document.getElementById('container').style.display = 'none';
     document.getElementById('printBtn').style.display = 'none';
     window.print();
     document.getElementById('container').style.display = 'block';
     document.getElementById('printBtn').style.display = 'block';
}

/* ========== EVENT'S FUNCTION ========== */
const searchResult = (event) => {
     event.preventDefault();

     const searchSemester = document.getElementById("search-semester").value;
     const searchRoll = document.getElementById("search-roll").value;
     const searchReg = document.getElementById("search-register").value;
     const searchVerify = document.getElementById("search-verify").value;

     if (searchVerify == verify) {
          axios.get('/result/find', { params: { semester: searchSemester, roll: searchRoll, register: searchReg } })
               .then(({ data }) => {
                    if (data.length > 0) {
                         showResult(data);

                         axios.get('/student/find', { params: { semester: searchSemester, roll: searchRoll, register: searchReg } })
                              .then(({ data }) => { showProfile(data) })
                              .catch(err => { console.log(err) });
                    }
               })
               .catch(err => { console.log(err); });
     } else {
          alert("Please Enter the Value")
     }
}

const resetResult = () => {
     wrapperSection.style.cssText = `height: 100vh;display: flex;`;
     resultSection.style.display = 'none';
}
/* ========== EVEN LISTENER ========== */
window.onload = function () {
     const verifyFirst = document.getElementById("verify-first");
     const verifyLast = document.getElementById("verify-last");

     const first = Math.round(Math.random() * 10);
     const last = Math.round(Math.random() * 10);

     verifyFirst.innerText = first;
     verifyLast.innerText = last;

     verify = first + last;
}
searchResultForm.addEventListener('submit', searchResult);
searchResultForm.addEventListener('reset', resetResult);
