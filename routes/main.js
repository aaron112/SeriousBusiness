// Get all of our friend data
//var data = require('../data.json');

var data = require('../data.json');

exports.view = function(req, res){
	//console.log(data);

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {

        console.log("req.cookies.sbpid = " + req.cookies.sbpid);

        var userresv = data['reservations'][req.cookies.sbpid];
        var deleteid = req.query.deleteid;
        var id = 0;

        if (deleteid) {
            console.log( "deleteid = " + deleteid );

            for ( i=0; i < userresv.length; ++i ) {
                console.log( "for loop: " + i );

                if ( userresv[i]['id'] == deleteid ) {

                    console.log( "delete target found" );
                    userresv.splice(id, 1);
                    break;
                }
            }

        }


        data['myreserv'] = userresv;

        if ( data['myreserv'] != undefined )
            data['showreserv'] = (data['myreserv'].length > 0);
        else
            data['showreserv'] = false;

        res.render('main', data);
    }
};