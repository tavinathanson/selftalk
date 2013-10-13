Lines = new Meteor.Collection("lines");

if (Meteor.isClient) {
	Template.line_input.events({
		'submit' : function() {
    	Lines.insert({text: line.value});

			// FIXME: Doesn't work
			updateScroll();

			// Prevent the page from reloading on submit
			return false;
		}
	});

	Template.line_output.lines = function () {
		return Lines.find({});
	};
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // No startup code, currently.
  });
}

function updateScroll(){
	var element = document.getElementById("line-output");
	element.scrollTop = element.scrollHeight;
}

