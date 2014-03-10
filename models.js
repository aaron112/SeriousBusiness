
var Mongoose = require('mongoose');


exports.Routes = Mongoose.model('Routes', new Mongoose.Schema({
    "_id": String,
    "name": String,
    "shortname": String
}));

exports.Busstops = Mongoose.model('Busstops', new Mongoose.Schema({
    "sid": {type: String, ref: 'Routes'},
    "stopid": String,
    "name": String,
    "imageurl": String,
    "inline": Number,
    "waittime": Number,
    "plusmins": Number,
    "long": Number,
    "lat": Number
}));

exports.Schedule = Mongoose.model('Schedule', new Mongoose.Schema({
    "sid": {type: String, ref: 'Routes'},
    "date": Date,
    "seatsleft": Number,
    "walkin": Number
}));

exports.Reservations = Mongoose.model('Reservations', new Mongoose.Schema({
    "userid": {type: String, ref: 'Users'},
    "sid": {type: String, ref: 'Routes'},
    "beginstop": {type: Mongoose.Schema.Types.ObjectId, ref: 'Busstops'},
    "endstop": {type: Mongoose.Schema.Types.ObjectId, ref: 'Busstops'},
    "schid": {type: Mongoose.Schema.Types.ObjectId, ref: 'Schedule'}
}));

exports.Users = Mongoose.model('Users', new Mongoose.Schema({
    "userid": String,
    "password": String,
    "name": String
}));