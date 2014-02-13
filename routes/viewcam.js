// Get all of our friend data
//var data = require('../data.json');

exports.view = function(req, res){
	//console.log(data);

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        var stop = req.query.stop;
        var data = {};

        data['stop'] = stop;

        res.render('viewcam', data);
    }
};

