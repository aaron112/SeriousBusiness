var deleteId = null;


function showDeleteDialog(id) {

    console.log("showDeleteDialog("+id+")");

    deleteId = id;

    //$("body").pagecontainer("change", "#deleteDialog", {reloadPage: false, changeHash: false, role: "popup", allowSamePageTransition: true});

    $( "body" ).pagecontainer( "getActivePage" ).find('#deleteDialog').popup('open', { positionTo: "window", transition: "pop" });
}

function actionDelete() {

    console.log("actionDelete("+deleteId+")");

    $("body").pagecontainer("change", "/removeresv?deleteid="+deleteId, {allowSamePageTransition: true, reloadPage: true, changeHash: true});
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
