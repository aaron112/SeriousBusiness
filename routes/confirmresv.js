// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	//console.log(data);

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        data["lineid"] = req.query.line;
        data["line"] = data['shuttleidtoname'][req.query.line];
        data["stop"] = req.query.stop;
        data["endstop"] = req.query.endstop;
        data["time"] = req.query.time;

        res.render('confirmresv', data);
    }
};