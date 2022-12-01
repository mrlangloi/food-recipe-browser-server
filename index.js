const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3500;
const MONGO_URI = `mongodb+srv://rcheung:1234asdf@cpsc2600-final-project.jghzcx2.mongodb.net/?retryWrites=true&w=majority`;

/**
 * TODO
 * - add appropriate HTTP responses and status codes for each routes
 * - CITE SOURCES!!
 * - record demo video showcasing my web app
 * - deploy my app using Heroku
 */

// initialize express
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// route
app.use('/recipes', require('./routes/api/recipes'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('./public'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });
}

// connect to mongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        // listen
        app.listen(PORT, () => console.log(`Connected to DB, server started on port ${PORT}!`));
    });