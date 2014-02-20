
var models = require('../models');
//var data = require('../data.json');

function createGuid()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

exports.add = function(req, res){

    //var addid = createGuid();
    var beginstop = req.query.beginstop;
    var endstop = req.query.endstop;
    var schid = req.query.schid;

    // Check if cookie exists:
    if ( req.cookies.sbpid != undefined ) {

        console.log("req.cookies.sbpid = " + req.cookies.sbpid);

        if ( req.query.newresv ) {

            console.log( "userid = " + req.cookies.sbpid + ", beginstop = " + beginstop
            + ", endstop = " + endstop + ", schid = " + schid );

            var newEntry = new models.Reservations({
                'userid': req.cookies.sbpid,
                'beginstop': beginstop,
                'endstop': endstop,
                'schid': schid
            });

            newEntry.save(function (err) {
                if(err) { console.log(err); res.send(500); }
                else res.redirect('/');
            });

        }
    }
};

exports.remove = function(req, res) {

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {

        console.log("req.cookies.sbpid = " + req.cookies.sbpid);

        var deleteid = req.query.deleteid;

        if (deleteid) {
            models.Reservations
                .find( { "_id": deleteid } )
                .remove()
                .exec(function (err) {
                    if(err) { console.log(err); res.send(500); }
                    else res.redirect('/');
                });
        } else {
            res.redirect('/');
        }
    }
};