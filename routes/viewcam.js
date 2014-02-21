// Get all of our friend data
//var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
	//console.log(data);

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        var stopid = req.query.stopid;
        var stop = req.query.stop;
        console.log("stopid = " + stopid);
        
        models.Busstops.find( { "_id": stopid } ).exec(render);

        function render(err, result) {
        	if(err) { console.log(err); res.send(500); }
        	console.log("result = " + result);
        	var data = {};
        	data['stop'] = stop;
        	data['result'] = result
	        res.render('viewcam', data);
    	}
    }
};

