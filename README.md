## Result Management System Version.1
Most institutes are facing problems to publish examination results. They have to collect every individual subject mark after the exam and calculate the marks and generate the result manually. It’s very time-consuming work and many workforces need this work. 


No more suffering. It's a revolutionary time. RMS is here to make it automatic and make it easier. RMS is a result management system, that can calculate marks and generate the result by itself. And can publish the result to the students. After entering every subject’s mark admin can public the result page to the student and students can search their results by themself.  

RMS is a program, not a complete website. It’s can implement on any existing website. And we don’t have to worry about server-side, because this program only needs some database table with a proper schema. RMS’s all calculations and functional are on Front-end by Vanilla JavaScript. Which makes this program more confutable and easy to use.


#### Features:

- Input all student information together by excel sheet
- Read, update, delete any student information
- Create result for separate department & semester
- Read, update, delete any result 
- Find every individual result with roll, registration & semester
- See marksheet if the result is not failed
- Print marksheet if the result is not failed


### Installation

1. Clone repository

```bash
https://github.com/mamorshedalam/rms-v1.git
```

2. Go to the folder

```bash
cd rms-v1
```

3. Install Node packages

```bash
npm i
```

4. Run Local server with development change waching...

```bash
npm run dev
```

5. Open browser

```bash
http://localhost:4000
```


#### Technology:

 - HTML5
 - CSS3
 - Javascript
 - Node JS
 - Express JS
 - MongoDB
 - Axios


#### Learning:

 - Convert JSON data from XLSX data
 - Server creation by Node JS
 - CRUD operations by Node JS
 - API creation by Express JS
 - Manage Route by Express JS
 - Manage data with MongoDB Database
 - Schema creation for MongoDB by Mongoose JS
 - Generate GPA, Points, Grade from numbers
 - Handle API with Axios
 - Print data sheet


#### How to use:

##### (Upload Student Information)
 - First, have to input student information into an excel sheet
 - After that, upload the excel sheet in student information form
 - In the end, submit student information with department, semester, session

##### (Upload Result)
 - First, find students by department, semester & session
 - Then, enter a subject name, code, full marks
 - In the end, submit result with each student numbers

##### (Find & Print Result)
 - First, find every individual result with semester, roll, registration
 - Then, print your marksheet

Live link : https://rms-v1-ten.vercel.app/

Dashboard Link: https://rms-v1-ten.vercel.app/dashboard
