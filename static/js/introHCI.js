'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#testjs").click(function(e) {
		$('.jumbotron h1').text("Javascript is connected");
		$("#testjs").text("You're done!");
		$(".jumbotron p").toggleClass("active");
	});

	$("#submitBtn").click(function(e) {
		var proj = $($("#project").val());
		proj.animate({
			width: $("#width").val()
		});

		var desc = $("#description").val();
		var description = proj.find(".project-description");
		if (description.length == 0) {
       		proj.append("<div class='project-description'><p>"+desc+"</p></div>");
    	} else {
			description.text(desc);
		}
	});

	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
	$("a.thumbnail").click(projectClick);
}

function projectClick(e) {
	var containingProject = $(this).closest(".project");
    var description = $(containingProject).find(".project-description");
    if (description.length == 0) {
       $(containingProject).append("<div class='project-description'><p>Description of the project.</p></div>");
    } else {
    	description.fadeOut();
       //description.html("<p>Stop clicking on me! You just did it at " + (new Date()) + "</p>");
    }

    // prevent the page from reloading?
    e.preventDefault();
    // In an event handler, $(this) refers to?
    // the object that triggered the event?
    $(this).css("background-color", "#7fff00");
}