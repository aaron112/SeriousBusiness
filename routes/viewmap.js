
var utils = require('../utils');
var models = require('../models');

exports.view = function(req, res){

    var popup = req.query.popup;
    var stopid = req.query.stopid;

    console.log("stopid = " + stopid);
        
    models.Busstops.findOne( { "_id": stopid } ).exec(render);

    function render(err, result) {
        if(err) { console.log(err); res.send(500); }
        console.log("result = " + result);

        var data = {};
        data['result'] = result;

        res.render('viewmap', data);
    }
};
