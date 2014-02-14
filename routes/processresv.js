
var data = require('../data.json');

exports.add = function(req, res){
    
    
};

exports.remove = function(req, res) {

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

                if ( userresv[i]['id'] == deleteid ) {

                    console.log( "delete target found" );
                    userresv.splice(id, 1);
                    break;
                }
            }

            res.redirect('/main');

        }
    }
};