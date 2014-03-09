
var rid = null, from = null, to = null, plusmins = 0;

var lastPopup = null;

var currLoc = null;

$(document).ready(function() {
    setTimeout(function(){
        popup('popupRoute', 'open');
    },350);


    if ("geolocation" in navigator) {
        console.log(" geolocation is available");
        navigator.geolocation.getCurrentPosition(function(position) {
            currLoc = position;
        });

    } else {
        console.log(" geolocation is NOT available");
    }
    
});

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

    $( "#fromSelect" ).text('Origin');
    $( "#toSelect" ).text('Destination');

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

    if ( rid == id )
        return;

    var lat = 0;
    var lon = 0;
    if ( currLoc ) {
        lat = currLoc.coords.latitude;
        lon = currLoc.coords.longitude;
    } else {
        toast("Current location unavailable.", 'ui-body-e');
    }

    $('#popupRoute').bind({
        popupafterclose: function(event, ui) {
            clear();
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

        showHint("Next, select your origin stop.");
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

        showHint("Finally, select your destination.");
        turnBlack('#fromSelect');
        turnGreen('#toSelect');

        popup('popupTo', 'open');
    }
}

function selectTo(id, name, pm, fromPopup) {

    // Prevent restore popup
    lastPopup = null;

    popup(fromPopup, 'close');

    if ( to == id )
        return;

    to = id;

    $( "#toSelect" ).text(name);

    $.get("/getsch?rid="+rid+"&from="+from+"&to="+to+"&plusmins="+plusmins, onAjaxDone);

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

function showMap(id, popupId) {

    $('#popupDetails').html('<a href="#" data-rel="back" class="ui-btn ui-btn-b ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><iframe src="/viewmap?stopid='+id+'" width="270" height="400" seamless></iframe>');
    $('#popupDetails').trigger('create');

    // Prevent restore popup
    //lastPopup = null;

    //lastPopup = popupId;

    //$('#'+popupId).unbind();
    //popup(popupId, 'close');

    //$( '#'+popupId ).bind({
    //    popupafterclose: function(event, ui) {
            
    //        $( '#'+popupId ).unbind();

    //        $('#popupDetails').bind({
    //            popupafterclose: function(event, ui) {
    //                restoreLastPopup();
    //                $('#popupDetails').unbind();
    //            }
    //        });
    //        popup('popupDetails', 'open');
    //    }
    //});
}

function restoreLastPopup() {
    if ( lastPopup == null )
        return;

    popup(lastPopup, 'open');
}