
// Allows left panel swipe open
$( document ).on( "pagecreate", "#page-wrap", function() {
    $( document ).on( "swipeleft swiperight", "#page-wrap", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#leftpanel" ).panel( "open" );
            }
        }
    });
});

var deleteId = null;


function showDeleteDialog(id) {

    console.log("showDeleteDialog("+id+")");

    deleteId = id;

    $("#showDialog").click();
}

function actionDelete() {

    console.log("actionDelete("+deleteId+")");

    $("body").pagecontainer("change", "/main?deleteid="+deleteId, {});
}