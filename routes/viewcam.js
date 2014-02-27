
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){
	//console.log(data);

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        var stopid = req.query.stopid;

        console.log("stopid = " + stopid);
        
        models.Busstops.findOne( { "_id": stopid } ).exec(onResult);

        function onResult(err, result) {
        	if(err) { console.log(err); res.send(500); }
        	console.log("result = " + result);

            // Fake Date
            var currTime = new Date();
            currTime.setDate(19);
            currTime.setMonth(1);
            currTime.setFullYear(2014);

            models.Schedule.findOne( { 
                "sid": result.sid,
                'date': {'$gte': currTime} } )
            .exec(render);

            function render(err, schresult) {
                var data = {};
                data['result'] = result;

                if ( schresult ) {
                    var nextBus = new Date(schresult.date.getTime() + (result.plusmins*60000) )
                    var diff = new Date( nextBus - currTime );

                    data['nextBus'] = utils.toTime(nextBus);
                    data['mindiff'] = diff.getMinutes();
                }

                res.render('viewcam', data);
            }
    	}
    }
};

