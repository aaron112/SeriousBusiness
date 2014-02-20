
exports.toTime = function (date) {

    var hours = date.getHours();
    var ampm = (hours < 12) ? 'AM' : 'PM';
    hours %= 12;

    return ''+hours+':'+date.getMinutes()+' '+ampm;
}