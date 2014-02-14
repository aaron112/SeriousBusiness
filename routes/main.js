// Get all of our friend data
//var data = require('../data.json');

var data = require('../data.json');

exports.view = function(req, res){
	//console.log(data);

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {

        var userresv = data['reservations'][req.cookies.sbpid];

        data['myreserv'] = userresv;

        if ( data['myreserv'] != undefined )
            data['showreserv'] = (data['myreserv'].length > 0);
        else
            data['showreserv'] = false;

        res.render('main', data);
    }
};