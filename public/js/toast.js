var toast=function(msg, uiclass){
    $("<div class='ui-loader ui-overlay-shadow "+uiclass+" ui-corner-all'><h3>"+msg+"</h3></div>")
    .css({ display: "block", 
        opacity: 0.90, 
        position: "fixed",
        padding: "7px",
        "text-align": "center",
        width: "270px",
        left: ($(window).width() - 284)/2,
        top: 10 })
    .appendTo( $.mobile.pageContainer ).delay( 1500 )
    .fadeOut( 400, function(){
        $(this).remove();
    });
}
