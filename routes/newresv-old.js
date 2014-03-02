
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){

    var line = req.query.line;
    var beginstop = req.query.beginstop;
    var endstop = req.query.endstop;
    var plusmins = req.query.plusmins;

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        
        console.log("line = " + line);
        console.log("beginstop = " + beginstop);
        console.log("endstop = " + endstop);

        if (line) {
            if ( endstop ) {
                // Choose time
                // Fake Date
                var currTime = new Date();
                currTime.setDate(19);
                currTime.setMonth(1);
                currTime.setFullYear(2014);

                console.log("current time: "+currTime.toString());

                models.Schedule
                    .find( {
                        'sid': line,
                        'date': {'$gte': currTime}} )
                    .sort('_id')
                    .exec(render);

            } else if ( beginstop ) {
                // Choose endstop
                models.Busstops
                    .find( {'sid': line} )
                    .exec(render);

            } else {
                // Choose beginstop
                models.Busstops
                    .find( {'sid': line} )
                    .exec(render);
            }

        } else {
            models.Shuttles.find().exec(render);
        }
    }


    function render(err, result) {
        if(err) { console.log(err); res.send(500); }

        var data = {};
        data['line'] = line;
        data['beginstop'] = beginstop;
        data['endstop'] = endstop;
        data['result'] = result;

        if ( endstop ) {
            for ( i in result ) 
                result[i]['time'] = utils.toTime( 
                new Date(result[i]['date'].getTime() + (plusmins*60000) ));
            
            res.render('time', data);

        } else if (line && beginstop) {

            //
            for ( i in result ) {
                if ( result[i]['id'] == beginstop ) {
                    result[i]['name'] = "(Leaving From) "+result[i]['name'];
                } else {
                    result[i]['clickable'] = true;
                }
            }

            res.render('destination', data);
        } else {
            res.render('newresv-old', data);
        }
    }
};