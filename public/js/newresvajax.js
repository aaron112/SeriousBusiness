
var rid = null, from = null, to = null, plusmins = 0;

var lastPopup = null;

$(document).ready(function() {
    setTimeout(function(){
        popup('popupRoute', 'open');
    },300);
    
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
    $("#schedule").html("<li><h3>"+hint+"</h3></li>");
    $('#schedule').trigger('create');    
    $('#schedule').listview('refresh');
}

function turnBlack(id) {
    $(id).removeClass('ui-btn-a');
    $(id).removeClass('btn-green');
    $(id).addClass('ui-btn-b');
}

function turnGreen(id) {
    $(id).removeClass('ui-btn-a');
    $(id).removeClass('ui-btn-b');
    $(id).addClass('btn-green');
}

function turnWhite(id) {
    $(id).removeClass('btn-green');
    $(id).removeClass('ui-btn-b');
    $(id).addClass('ui-btn-a');
}

function selectRoute(id, name) {
    
    popup('popupRoute', 'close');

    if ( rid == id )
        return;

    $('#popupRoute').bind({
        popupafterclose: function(event, ui) {
            clear();
            rid = id;
            $( "#routeSelect" ).text(name);
            $.get("/getstops?rid="+id+"&shownearest=true", onAjaxDone);
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

        popup('popupFrom', 'open');
    }
}

function selectFrom(id, name, pm) {

    popup('popupFrom', 'close');

    if ( from == id )
        return;


    $('#popupFrom').bind({
        popupafterclose: function(event, ui) {
            clear();

            from = id;
            plusmins = pm;

            $( "#fromSelect" ).text(name);

            $.get("/getstops?rid="+rid+"&excl="+id, onAjaxDone);
            
            $('#popupFrom').unbind();
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

function selectTo(id, name, pm) {

    popup('popupTo', 'close');

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

function showDetails(id, popupId) {

    lastPopup = popupId;

    popup(popupId, 'close');

    $( '#'+popupId ).bind({
        popupafterclose: function(event, ui) {
            $.get("/viewcam?popup=true&stopid="+id, onAjaxDone);
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

function restoreLastPopup() {
    if ( lastPopup == null )
        return;

    popup(lastPopup, 'open');
}