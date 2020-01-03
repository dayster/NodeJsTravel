const Travels = require('../models/Travels');

exports.displayTravels = async (req, res) => {
    const travels = await Travels.findAll();
    res.render('travels', {
            pageTitle: 'Upcoming Travels', 
            travels
        });
}

exports.displayTravel = async (req, res) => {
    const travel = await Travels.findByPk(req.params.id);
        res.render('travel', { travel});
}