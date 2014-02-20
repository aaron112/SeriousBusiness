
var Mongoose = require('mongoose');


exports.Shuttles = Mongoose.model('Shuttles', new Mongoose.Schema({
    "id": String,
    "name": String
}));

exports.Busstops = Mongoose.model('Busstops', new Mongoose.Schema({
    "sid": String,
    "name": String
}));

exports.Schedule = Mongoose.model('Schedule', new Mongoose.Schema({
    "sid": String,
    "date": Date,
    "seatsleft": Number,
    "walkin": Number
}));

exports.Reservations = Mongoose.model('Reservations', new Mongoose.Schema({
    "userid": String,
    "beginstop": {type: Mongoose.Schema.Types.ObjectId, ref: 'Busstops'},
    "endstop": {type: Mongoose.Schema.Types.ObjectId, ref: 'Busstops'},
    "schid": {type: Mongoose.Schema.Types.ObjectId, ref: 'Schedule'}
}));