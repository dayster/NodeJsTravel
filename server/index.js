const express = require('express');
const path = require('path');
const routers = require('./routes');
const bodyParser = require('body-parser');

// Import Db

const db = require('../server/config/database');

// test db

// db.authenticate()
//     .then(() => console.log('Database Connected'))
//     .catch(error => console.log(error));

// Import Configuration
const configs = require('./config');

// Create Server
const app = express();

const config = configs[app.get('env')];

// Enable View
app.set('view engine', 'pug');


// Add View Into Project

app.set('views', path.join(__dirname, './views'));

// Load Static Folder

app.use(express.static('public'));

// get the current year

app.use((req, res, next) => {
    const date = new Date();
    res.locals.currentYear = date.getFullYear();
    res.locals.currentPath = req.path;
    
    return next();
});

// Pass sitename 

app.locals.sitetitle = config.sitename;

// enable body parser

app.use(bodyParser.urlencoded({extended: true}));

// Listen

app.use('/', routers());

// Run
 app.listen(3000);