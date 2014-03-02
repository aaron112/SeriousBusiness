
exports.toTime = function (date) {

    var hours = date.getHours();
    var mins = date.getMinutes();
    var ampm = (hours < 12) ? 'AM' : 'PM';
    hours %= 12;

    if (hours == 0) hours = '12';
    if (mins < 10) mins = '0'+mins;

    return ''+hours+':'+mins+' '+ampm;
}

var pi = Math.PI;

exports.distance = function (lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = ((lat2-lat1)*(pi/180));
    var dLon = ((lon2-lon1)*(pi/180));
    var lat1 = (lat1*(pi/180));
    var lat2 = (lat2*(pi/180));

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;

    return d;
}
