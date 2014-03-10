
var models = require('../models');

exports.view = function(req, res){
	//console.log(data);

    // Check if cookie exists:
    if ( req.cookies.sbpid ) {

        res.redirect('/main');

    } else {

        var warnmsg = null;

        if ( req.query.incorrectpw )
            warnmsg = 'Incorrect password. Please try again!';
        else if ( req.query.emptyuser )
            warnmsg = 'Username/PID cannot be blank!';

        res.render('login', {'warnmsg': warnmsg});
    }
};

exports.process = function(req, res){

    if ( req.query.logout == 'true' ) {
        // Logging out
        res.clearCookie('sbpid');

        res.redirect('/');

    } else {
        console.log("req.body.pid = " + req.body.pid);

        var pid = req.body.pid;
        var pw = req.body.pass;

        if ( !pid || pid == '' ) {
            res.redirect(303, '/?emptyuser=true');
            return;
        }

        models.Users
            .findOne( {'userid': pid.toLowerCase()} )
            .exec(checkUser);

        function checkUser(err, result) {
            if(err) { console.log(err); res.send(500); }

            console.log("result = " + result);

            if ( !result ) {
                res.redirect(303, '/signup?pid='+pid.toLowerCase());
                return;

            } else if ( result.password != pw ) {
                res.redirect(303, '/?incorrectpw=true');
                return;

            }

            res.cookie('sbpid', pid.toLowerCase());
            res.cookie('sbuname', result.name);

            // Redirect to main page
            res.redirect(303, '/main');
        }
    }
};

exports.signup = function(req, res) {

    res.render('quicksignup', req.query);
};

exports.process_signup = function(req, res) {


    var name = req.body.name;
    var pid = req.body.pid;
    var pw = req.body.confirmpass;

    new models.Users({
        'userid': pid,
        'password': pw,
        'name': name
    })
    .save(doLogin);

    function doLogin(err) {
        if(err) {

            console.log(err); res.send(500);

        } else {
            res.cookie('sbpid', pid.toLowerCase());
            res.cookie('sbuname', name);

            // Redirect to main page
            res.redirect(303, '/main');
        }
    }
};