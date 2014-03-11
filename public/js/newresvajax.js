
var rid = null, from = null, to = null, plusmins = 0;
var timeRangeStart = null;
var timeRangeEnd = null;
var timeRangeDisplay = '';

var lastPopup = null;
var currLoc = null;


$(document).ready(function() {

    if ("geolocation" in navigator) {
        console.log(" geolocation is available");
        navigator.geolocation.getCurrentPosition(function(position) {
            currLoc = position;
        });

    } else {
        console.log(" geolocation is NOT available");
    }

    showHint("Select Shuttle Route to begin.");

    var currTime = new Date();
    var currTimeMins = currTime.getHours()*60 + currTime.getMinutes();

    // Time range select
    $('#timeSlider')
    .noUiSlider({
         range: [0, 1439]
        ,start: [currTimeMins, 1439]
        ,handles: 2
        ,connect: true
        ,step: 15
        ,slide: updateTime
    });

    updateTime();

    setTimeout(function(){
        popup('popupRoute', 'open');
    },400);


    clear();
    
});

function updateTime() {

    var start = $('#timeSlider').val()[0];
    var start_hour = Math.floor(start/60);
    var start_hour_12 = (start_hour != 12)?start_hour%12:start_hour;
    var start_ampm = (start_hour < 12) ? 'AM' : 'PM';

    var start_min = start%60;
    var start_min_display = start_min==0?'00':start_min;

    var end = $('#timeSlider').val()[1];
    var end_hour = Math.floor(end/60);
    var end_hour_12 = (end_hour != 12)?end_hour%12:end_hour;
    var end_ampm = (end_hour < 12) ? 'AM' : 'PM';

    var end_min = end%60;
    var end_min_display = end_min==0?'00':end_min;

    timeRangeDisplay = start_hour_12+":"+start_min_display+" "+start_ampm+" - "+end_hour_12+":"+end_min_display+" "+end_ampm;

    $('#confirmTime').text(timeRangeDisplay);

    timeRangeStart = start_hour+":"+start_min;
    timeRangeEnd = end_hour+":"+end_min;
}

function popup(id, action) {

    if ( action == 'open' ) {
        if ( id == 'popupFrom' && rid == null )
            return;

        if ( id == 'popupTo' && from == null )
            return;
    }

    $( "body" )
    .pagecontainer( "getActivePage" )
    .find('#'+id).popup(action, { 
        positionTo: "window", 
        transition: "pop" }
        );
}

function clear() {

    $( "#fromSelect" ).text('Start').hide();
    $( "#toSelect" ).text('End').hide();
    $( "#timeSelect" ).hide();

    from = null;
    to = null;
    plusmins = 0;
}

function showHint(hint) {
    $("#hint").html(hint);

    $("#schedule").empty();

    toast(hint, 'ui-body-g');
}

function turnBlack(id) {
    $(id).removeClass('ui-btn-b');
    $(id).removeClass('ui-btn-c');
    $(id).addClass('ui-btn-a');
}

function turnGreen(id) {
    $(id).removeClass('ui-btn-a');
    $(id).removeClass('ui-btn-c');
    $(id).addClass('ui-btn-b');
}

function turnWhite(id) {
    $(id).removeClass('ui-btn-a');
    $(id).removeClass('ui-btn-b');
    $(id).addClass('ui-btn-c');
}

function selectRoute(id, name) {
    
    popup('popupRoute', 'close');

    $( "#fromSelect" ).show();

    if ( rid == id )
        return;

    var lat = 0;
    var lon = 0;
    if ( currLoc ) {
        lat = currLoc.coords.latitude;
        lon = currLoc.coords.longitude;
    } else {
        toast("Current location unavailable. Please make sure your GPS is on.", 'ui-body-e');
    }

    $('#popupRoute').bind({
        popupafterclose: function(event, ui) {
            clear();

            $( "#fromSelect" ).show();

            rid = id;
            $( "#routeSelect" ).text(name);
            $.get("/getstops?rid="+id+((currLoc)?("&shownearest=true&lat="+lat+"&lon="+lon):""), onAjaxDone);
            $('#popupRoute').unbind();
        }
    });

    function onAjaxDone(result) {
        $( ("#fromStops") ).html(result);

        $('#fromStops').trigger('create');    
        $('#fromStops').listview('refresh');

        showHint("Next, select your start stop.");
        turnBlack('#routeSelect');
        turnGreen('#fromSelect');
        turnWhite('#toSelect');

        popup('popupFrom', 'open');
    }
}

function selectFrom(id, name, pm, fromPopup) {

    // Prevent restore popup
    lastPopup = null;

    popup(fromPopup, 'close');

    if ( from == id )
        return;

    $('#'+fromPopup).bind({
        popupafterclose: function(event, ui) {
            clear();

            $( "#fromSelect" ).show();
            $( "#toSelect" ).show();

            from = id;
            plusmins = pm;

            $('#fromSelect').text(name);

            $.get("/getstops?rid="+rid+"&excl="+id, onAjaxDone);
            
            $('#'+fromPopup).unbind();
        }
    });

    function onAjaxDone(result) {
        $( ("#toStops") ).html(result);

        $('#toStops').trigger('create');    
        $('#toStops').listview('refresh');

        showHint("Finally, select end stop.");
        turnBlack('#fromSelect');
        turnGreen('#toSelect');

        popup('popupTo', 'open');
    }
}

function selectTo(id, name, pm, fromPopup) {

    $("#timeSelect").show();
    // Prevent restore popup
    lastPopup = null;

    popup(fromPopup, 'close');

    if ( timeRangeStart && timeRangeEnd )
        $("#timeSelect").text(timeRangeDisplay);

    if ( (!id || !name ) && (!rid || !from || !to || !plusmins) )
        return;

    if ( to == id )
        return;

    if ( id )
        to = id;

    if ( name )
        $( "#toSelect" ).text(name);

    var timeQuery = null;
    if ( timeRangeStart && timeRangeEnd ) {
        timeQuery="&stime="+timeRangeStart+"&etime="+timeRangeEnd;
    }

    $.get("/getsch?rid="+rid+"&from="+from+"&to="+to+"&plusmins="+plusmins+(timeQuery?timeQuery:""), onAjaxDone);

    function onAjaxDone(result) {
        $( ("#schedule") ).html(result);

        $('#schedule').trigger('create');    
        $('#schedule').listview('refresh');
        
        turnBlack('#toSelect');
    }
}

function showDetails(id, popupId, view, func) {

    var viewurl = view=='map'?'viewmap':'viewcam';

    lastPopup = popupId;

    popup(popupId, 'close');

    $( '#'+popupId ).bind({
        popupafterclose: function(event, ui) {
            $.get("/viewcam?popup=true&stopid="+id+"&func="+func, onAjaxDone);
            $( '#'+popupId ).unbind();
        }
    });

    function onAjaxDone(result) {
        console.log("onAjaxDone()");


        $('#popupDetails').html(result);
        $('#popupDetails').trigger('create');

        $('#popupDetails').bind({
            popupafterclose: function(event, ui) {
                restoreLastPopup();
                $('#popupDetails').unbind();
            }
        });

        popup('popupDetails', 'open');
    }
}

function showMap(id, popupId, selectBtn) {

    $('#popupDetails').html('<a href="#" data-rel="back" class="ui-btn ui-btn-b ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><iframe src="/viewmap?stopid='+id+'" width="270" height="400" seamless></iframe>'+selectBtn);
    $('#popupDetails').trigger('create');
}

function restoreLastPopup() {
    if ( lastPopup == null )
        return;

    popup(lastPopup, 'open');
}