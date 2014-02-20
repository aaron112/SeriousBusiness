
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){
	//console.log(data);

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {

        models.Reservations
            .find( {'userid': req.cookies.sbpid} )
            .populate('sid', 'shortname')
            .populate('beginstop', 'name')
            .populate('endstop', 'name')
            .populate('schid')
            .exec(renderReservations);
    }

    function renderReservations(err, userresv) {
        if(err) { console.log(err); res.send(500); }

        var schEntry;

        for ( var i in userresv ) {
            userresv[i]['time'] = utils.toTime(new Date(userresv[i].schid.date));
        }

        var data = {};
        data['myreserv'] = userresv;

        if ( userresv != undefined )
            data['showreserv'] = (userresv.length > 0);
        else
            data['showreserv'] = false;

        res.render('main', data);
    }
};

