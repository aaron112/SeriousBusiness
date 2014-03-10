
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){
	//console.log(data);

    var shownBefore = req.cookies.shownbefore;

    var deleted = req.query.deleted;

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {

        console.log("req.cookies.sbpid: " + req.cookies.sbpid);

        models.Reservations
            .find( {'userid': req.cookies.sbpid} )
            .populate('sid')
            .populate('beginstop')
            .populate('endstop', 'name')
            .populate('schid')
            .exec(renderReservations);
    }

    function renderReservations(err, userresv) {
        if(err) { console.log(err); res.send(500); }

        var schEntry;

        console.log("userresv.length = " + userresv.length);
        console.log("userresv = " + userresv);

        for ( var i in userresv ) {

            userresv[i]['time'] = utils.toTime( 
                new Date(userresv[i].schid.date.getTime() + 
                    (userresv[i].beginstop.plusmins*60000) ));
        }

        var data = {};

        if ( !shownBefore ) {
            res.cookie('shownbefore', true);
            data['showOverlay'] = true;
        }

        data['username'] = req.cookies.sbuname;
        data['deleted'] = deleted;
        data['myreserv'] = userresv;

        if ( userresv != undefined )
            data['showreserv'] = (userresv.length > 0);
        else
            data['showreserv'] = false;

        res.render('main', data);
    }
};

