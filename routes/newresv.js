
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){

    // A/B test
    // No longer need this (Handled by Google Analytics)
    //if ( Math.floor((Math.random()*100)+1) % 2 == 0 ) {
    //    res.redirect('/newresv-old');
    //}

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        models.Routes.find().exec(render);
    }

    function render(err, result) {
        if(err) { console.log(err); res.send(500); }

        console.log(result);

        var data = {};
        data['result'] = result;
        data['username'] = req.cookies.sbuname;

        res.render('newresv', data);
    }
};