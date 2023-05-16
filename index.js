require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI


// initialize express
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// route
app.use('/recipes', require('./routes/api/recipes'));

// connect to mongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        // listen
        app.listen(PORT, () => console.log(`Connected to DB, server started on port ${PORT}!`));
    });