// Get all of our friend data
//var data = require('../data.json');


//var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res) {

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {

        var line = req.query.line;
        //data['line'] = line;
        if(line) {
	        models.Busstops
	            .find( {'sid': line} )
	            .exec(render);
        }
        else {
        	models.Routes.find().exec(render);
        }

        console.log("line = " + line);
        
        function render(err, result) {
        	if(err) { console.log(err); res.send(500); }
        	console.log("result = " + result);
        	var data = {
                'map': req.query.map?true:false,
                'line': line,
                'result': result,
                'username': req.cookies.sbuname
            };
	        res.render('liveview', data);
    	}
    }
};

