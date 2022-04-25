require('dotenv').config();
// INPUT
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const corsOptions = require('./config/consOptions');
const connectDB = require('./config/dbConn');

// DATABASE
connectDB();

// EXPRESS
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SERVE
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/dashboard', express.static(path.join(__dirname, '/dashboard')));

// ROUTE
app.use('/', require('./routes/api/student'));
app.use('/', require('./routes/api/result'));

// RUN
const PORT = process.env.PORT || 4000;
mongoose.connection.once('open', () => {
     console.log("Connected to MongoDB");
     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})