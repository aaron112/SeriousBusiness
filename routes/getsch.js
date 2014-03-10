
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){

    var rid = req.query.rid;
    var from = req.query.from;
    var to = req.query.to;
    var plusmins = req.query.plusmins;
    var stime = req.query.stime;
    var etime = req.query.etime;

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {

        // Fake Date
        var cTime = new Date();
        cTime.setDate(19);
        cTime.setMonth(1);
        cTime.setFullYear(2014);

        var sTime = new Date();
        sTime.setDate(19);
        sTime.setMonth(1);
        sTime.setFullYear(2014);

        if ( stime ) {
            var stimeSplit = stime.split(":");
            sTime.setHours(stimeSplit[0]);
            sTime.setMinutes(stimeSplit[1]);

            if ( sTime.getTime() < cTime.getTime() ) {
                console.log("sTime("+sTime.toString()+") < cTime("+cTime.toString()+")");
                sTime = cTime;
            }
        } else {
            sTime = cTime;
        }

        console.log("current time: "+sTime.toString());

        var timeConstraints = {'$gte': sTime};

        var eTime = new Date();
        eTime.setDate(19);
        eTime.setMonth(1);
        eTime.setFullYear(2014);
        
        if ( etime ) {
            var stimeSplit = etime.split(':');
            eTime.setHours(stimeSplit[0]);
            eTime.setMinutes(stimeSplit[1]);

            timeConstraints['$lte'] = eTime;
        }

        models.Schedule
            .find( {
                'sid': rid,
                'date': timeConstraints,
                'seatsleft': {'$gt': 0}} )
            .sort('_id')
            .exec(render);
    }

    function render(err, result) {
        if(err) { console.log(err); res.send(500); }

        console.log(result);

        for ( i in result ) {
            if ( result[i]['seatsleft'] < 5 ) {
                result[i]['color'] = 'btn-red';
            } else if ( result[i]['seatsleft'] < 20 ) {
                result[i]['color'] = 'btn-yellow';
            } else {
                result[i]['color'] = 'btn-green';
            } 

            result[i]['time'] = utils.toTime( 
                new Date(result[i]['date'].getTime() + (plusmins*60000) ));
        }

        var data = {};
        data['result'] = result;
        data['hasdata'] = (result.length > 0);
        data['rid'] = rid;
        data['from'] = from;
        data['to'] = to;

        res.render('ajax/getsch', data);
    }
};