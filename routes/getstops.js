
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){

    var rid = req.query.rid;
    var excl = req.query.excl;
    var shownearest = req.query.shownearest;
    var lat = req.query.lat;
    var lon = req.query.lon;

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        if ( excl ) {

            models.Busstops
                        .find( {
                            'sid': rid,
                            '_id': {'$ne': excl}
                        } )
                        .sort('_id')
                        .exec(render);
        } else {

            models.Busstops
                        .find( {'sid': rid} )
                        .sort('_id')
                        .exec(render);
        }
    }

    function render(err, result) {
        if(err) { console.log(err); res.send(500); }

        console.log(result);

        var data = {};
        data['result'] = result;
        data['func'] = excl?'selectTo':'selectFrom';
        data['popupId'] = excl?'popupTo':'popupFrom';
        data['dividerTitle'] = excl?'To Where?':'From Where?';

        var nearest = -1;
        var lastDistance = -1;

        if ( shownearest && lat && lon ) {

            for ( i in result ) {
                var thisDistance = utils.distance(lat, lon, result[i]['lat'], result[i]['long'] );

                if ( lastDistance == -1 ||
                 lastDistance > thisDistance ) {

                    lastDistance = thisDistance;
                    nearest = i;
                }
            }

            if ( nearest != -1 )
                result[nearest]['nearest'] = true;
        }

        data['nearest'] = result[0];

        res.render('getstops', data);
    }
};