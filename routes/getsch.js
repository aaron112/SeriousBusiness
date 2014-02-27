
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){

    var rid = req.query.rid;
    var from = req.query.from;
    var to = req.query.to;

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {

        // Fake Date
        var currTime = new Date();
        currTime.setDate(19);
        currTime.setMonth(1);
        currTime.setFullYear(2014);

        console.log("current time: "+currTime.toString());

        models.Schedule
            .find( {
                'sid': rid,
                'date': {'$gte': currTime}} )
            .exec(render);
    }

    function render(err, result) {
        if(err) { console.log(err); res.send(500); }

        console.log(result);

        for ( i in result ) {
            result[i]['time'] = utils.toTime(result[i]['date']);
            if ( result[i]['seatsleft'] < 5 ) {
                result[i]['color'] = 'btn-red';
            } else if ( result[i]['seatsleft'] < 20 ) {
                result[i]['color'] = 'btn-yellow';
            } else {
                result[i]['color'] = 'btn-green';
            } 
        }

        var data = {};
        data['result'] = result;
        data['rid'] = rid;
        data['from'] = from;
        data['to'] = to;


        res.render('getsch', data);
    }
};