// Get all of our friend data
//var data = require('../data.json');

exports.view = function(req, res){
	//console.log(data);

    // Check if cookie exists:
    if ( req.cookies.sbpid ) {

        res.redirect('/main');

    } else {

        res.render('login');
    }
};

exports.process = function(req, res){

    if ( req.query.logout ) {
        // Logging out
        res.clearCookie('sbpid');

        res.redirect('/');
    } else {
        // Write a cookie
        res.cookie('sbpid', req.body.pid);

        // Redirect to main page
        res.redirect('/main');
    }
};