
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){

    var rid = req.query.rid;
    var excl = req.query.excl;
    var shownearest = req.query.shownearest;

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
                        .exec(render);
        } else {

            models.Busstops
                        .find( {'sid': rid} )
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
        data['shownearest'] = shownearest;

        data['nearest'] = result[0];

        res.render('getstops', data);
    }
};