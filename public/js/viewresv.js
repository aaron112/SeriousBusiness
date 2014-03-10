
function showDeleteDialog(id, stopName, origStop, destStop, time) {

    console.log("showDeleteDialog("+id+")");

    $( "#delInfo" ).html("Route: "+stopName+"<br>From: "+origStop+"<br>To: "+destStop+"<br>Time: "+time);

    $( "#deleteButton" ).attr("href", "/removeresv?deleteid="+id);
    $( "body" ).pagecontainer( "getActivePage" ).find('#deleteDialog').popup('open', { positionTo: "window", transition: "pop" });
}

$(document).ready(function(){

    $( "#floating" ).click(function() {
        $( "#floating" ).hide();
    });
});
