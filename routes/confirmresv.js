
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){
    var lineid = req.query.rid;
    var beginstop = req.query.from;
    var endstop = req.query.to;
    var schid = req.query.schid;

    var results = {};
    var total_tables = 4;
    var table_count = 0;

    // Check if cookie exists:
    if ( !req.cookies.sbpid ) {
        res.redirect('/');

    } else {
        models.Shuttles
            .findOne( {'_id': lineid} )
            .exec(shuttleDone);

        models.Schedule
            .findOne( {'_id': schid} )
            .exec(scheduleDone);

        models.Busstops
            .findOne( {'_id': beginstop} )
            .exec(beginstopDone);

        models.Busstops
            .findOne( {'_id': endstop} )
            .exec(endstopDone);
    }

    function shuttleDone(err, result) {
        if(err) { console.log(err); res.send(500); }
        results['shuttles'] = result;
        checkDone();
    }

    function scheduleDone(err, result) {
        if(err) { console.log(err); res.send(500); }
        results['schedule'] = result;
        checkDone();
    }

    function beginstopDone(err, result) {
        if(err) { console.log(err); res.send(500); }
        results['beginstop'] = result;
        checkDone();
    }

    function endstopDone(err, result) {
        if(err) { console.log(err); res.send(500); }
        results['endstop'] = result;
        checkDone();
    }


    function checkDone() {
        ++table_count;
        if ( table_count >= total_tables )
            render();
    }

    function render() {
        console.log(results);

        var data = {};
        data["lineid"] = lineid;
        data["beginstopid"] = beginstop;
        data["endstopid"] = endstop;

        data["line"] = results['shuttles']['name'];
        data["beginstop"] = results['beginstop']['name'];
        data["endstop"] = results['endstop']['name'];

        var d = results['schedule']['date']
        
        data["time"] = d.toDateString() + ' ' + utils.toTime(d);
        data["schid"] = schid;

        res.render('confirmresv', data);
    }
};