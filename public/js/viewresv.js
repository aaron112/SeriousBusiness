
function showDeleteDialog(id) {

    console.log("showDeleteDialog("+id+")");

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
