
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){

    var line = req.query.line;
    var beginstop = req.query.beginstop;
    var endstop = req.query.endstop;

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        models.Shuttles.find().exec(render);
    }

    function render(err, result) {
        if(err) { console.log(err); res.send(500); }

        console.log(result);

        var data = {};
        data['result'] = result;

        res.render('newresv', data);
    }
};