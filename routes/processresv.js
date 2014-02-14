
var data = require('../data.json');

function createGuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

exports.add = function(req, res){

    // Check if cookie exists:
    if ( req.cookies.sbpid ) {

        console.log("req.cookies.sbpid = " + req.cookies.sbpid);

        if ( req.query.newresv ) {

            var userresv = data['reservations'][req.cookies.sbpid];

            var addid = createGuid();
            var beginstop = req.query.beginstop;
            var endstop = req.query.endstop;
            var time = req.query.time;

            console.log( "addid = " + addid + ", beginstop = " + beginstop
            + ", endstop = " + endstop + ", time = " + time );
            
            userresv.push({
                "id": addid,
                "beginstop": beginstop,
                "endstop": endstop,
                "time": time
            });
        }
    }

    res.redirect('/');
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

                    console.log( "delete target found ("+userresv[i]['id']+" = "+deleteid+")" );
                    userresv.splice(i, 1);
                    break;
                }
            }

            res.redirect('/main');

        }
    }
};