// Get all of our friend data
//var data = require('../data.json');

exports.load = function(req, res){

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