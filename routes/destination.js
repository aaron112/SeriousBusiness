var data = require('../data.json');

exports.view = function(req, res){

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        var line = req.query.line;
        data['line'] = line;

        if (line) {
            data['busstops'] = data['allbusstops'][line];
        }

        console.log("line = " + line);
        console.log(data['allbusstops'][line]);

		var endstop = req.query.endstop;
		if(endstop) {
			res.render('time', data);
		}
		else {
			console.log("here");
        	res.render('destination', data);
        }
    }
};