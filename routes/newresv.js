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

		var stop = req.query.stop;
		var endstop = req.query.endstop;

        data['stop'] = stop;
        data['endstop'] = endstop;


        console.log("endstop = " + endstop);

        if ( endstop ) {
            res.render('time', data);
        } else if (line && stop) {
			res.render('destination', data);
        } else {
        	res.render('newresv', data);
        }
    }
};