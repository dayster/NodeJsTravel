const express = require('express');
const router = express.Router();

// Import models

const Travels = require('../models/Travels');
const Testimonials = require('../models/Testimonials');

module.exports = function(){
    // homepage url
    
    
    
    router.get('/', (req, res) => {
        const promises = [];

        promises.push(Travels.findAll({limit: 3}));
        promises.push(Testimonials.findAll({limit: 3}));

        const result = Promise.all(promises);
        
        result.then(result => res.render('index', {
            pageTitle: 'Home',
            className: 'home',
            travels: result[0],
            testimonials: result[1]
        }));
    });

    // about us url
    router.get('/about', (req, res) => {
        res.render('about', {
            pageTitle: 'About Us'
        });
    });

    // travels
    router.get('/travels', (req, res) => {
        Travels.findAll()
            .then(travels => res.render('travels', {
                pageTitle: 'Upcoming Travels',
                travels
            }));
    });

    // travel url
    router.get('/travels/:id', (req, res) => {
       Travels.findByPk(req.params.id)
            .then(travel => res.render('travel', {
                travel
            }));
    });

    // testimoninals
    router.get('/testimonials', (req, res) => {
        // res.render('testimonials', {
        //     pageTitle: 'Testimonials'
        // });
        Testimonials.findAll()
            .then(testimonials => res.render('testimonials', {
               pageTitle: 'Testimonials',
               testimonials 
            }));
     });

     router.post('/testimonials', (req, res) => {
        
        let {name, email, message} = req.body;

        // Validate Form
        let errors = [];
        if(!name){
            errors.push({'message': 'Add Your Name'});
        }
        if(!email){
            errors.push({'message': 'Add Your Email'});
        }
        if(!message){
           errors.push({'message': 'Add Your Testimonial'})       
        }

        // Show Errors
        if(errors.length > 0){
            Testimonials.findAll()
                .then(testimonials => res.render('testimonials', {
                pageTitle: 'Testimonials',
                errors,
                name,
                email,
                message,
                testimonials 
                }));
        }else{
        // Save Database
            Testimonials.create({
                name, 
                email, 
                message
            })
            .then(() => res.redirect('/testimonials'))
            .catch(error => console.log(error));
        }
        
        
     });

    return router;
}