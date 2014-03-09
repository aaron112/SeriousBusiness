
function showDeleteDialog(id, stopName, origStop, destStop, time) {

    console.log("showDeleteDialog("+id+")");

    $( "#delInfo" ).html("Route: "+stopName+"<br>From: "+origStop+"<br>To: "+destStop+"<br>Time: "+time);

    $( "#deleteButton" ).attr("href", "/removeresv?deleteid="+id);
    $( "body" ).pagecontainer( "getActivePage" ).find('#deleteDialog').popup('open', { positionTo: "window", transition: "pop" });
}

function showLeftPanel() {
    $( "#floating" ).hide();
    $( "body" ).pagecontainer( "getActivePage" ).find("#leftpanel").panel( "open" );
}

$(document).ready(function(){
    
    $('.navicon').click(showLeftPanel);

    $( "#floating" ).click(function() {
        $( "#floating" ).hide();
    });
});
