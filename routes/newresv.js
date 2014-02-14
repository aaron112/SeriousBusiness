// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        res.render('newresv', data);
    }
};

exports.process = function(req, res){
    if ( req.query.shuttle == "an" ) {
    	console.log("good");
        res.redirect('/anshuttle');
    } else {
        res.redirect('/cshuttle');
    }
};