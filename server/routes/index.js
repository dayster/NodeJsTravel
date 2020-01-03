const express = require('express');
const router = express.Router();

// Import models

const Travels = require('../models/Travels');
const Testimonials = require('../models/Testimonials');

// import Controller

const aboutController = require('../controller/aboutController');
const travelController = require('../controller/travelController');
const testimonialController = require('../controller/testimonialController');
const homeController = require('../controller/homeController');

module.exports = function(){
    // homepage url

    router.get('/', homeController.displayHome);

    // about us url
    router.get('/about', aboutController.aboutInformation);

    // travels
    router.get('/travels', travelController.displayTravels);

    // travel
    router.get('/travels/:id', travelController.displayTravel);

    // testimoninals
    router.get('/testimonials', testimonialController.displayTestimonials);

    
    router.post('/testimonials', testimonialController.addTestimonials);

    return router;
}