
exports.toTime = function (date) {

    var hours = date.getHours();
    var mins = date.getMinutes();
    var ampm = (hours < 12) ? 'AM' : 'PM';
    hours %= 12;

    if (hours == 0) hours = '00';
    if (mins < 10) mins = '0'+mins;

    return ''+hours+':'+mins+' '+ampm;
}