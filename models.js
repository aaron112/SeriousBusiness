
var Mongoose = require('mongoose');


exports.Shuttles = Mongoose.model('Shuttles', new Mongoose.Schema({
    "_id": String,
    "name": String,
    "shortname": String
}));

exports.Busstops = Mongoose.model('Busstops', new Mongoose.Schema({
    "sid": {type: String, ref: 'Shuttles'},
    "stopid": String,
    "name": String,
    "imageurl": String
}));

exports.Schedule = Mongoose.model('Schedule', new Mongoose.Schema({
    "sid": {type: String, ref: 'Shuttles'},
    "date": Date,
    "seatsleft": Number,
    "walkin": Number
}));

exports.Reservations = Mongoose.model('Reservations', new Mongoose.Schema({
    "userid": String,
    "sid": {type: String, ref: 'Shuttles'},
    "beginstop": {type: Mongoose.Schema.Types.ObjectId, ref: 'Busstops'},
    "endstop": {type: Mongoose.Schema.Types.ObjectId, ref: 'Busstops'},
    "schid": {type: Mongoose.Schema.Types.ObjectId, ref: 'Schedule'}
}));