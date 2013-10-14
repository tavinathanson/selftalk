Lines = new Meteor.Collection("lines");

if (Meteor.isClient) {
	Template.line_input.events({
		'submit' : function() {
    	Lines.insert({text: line.value});
	
			// Prevent the page from reloading on submit
			return false;
		}
	});

	Template.line_output.rendered = function () {
		// FIXME: Turn this into a constant, for find a better way since I'm not sure this works cross-browser
 		$("#line-output").scrollTop(99999);
	};

	Template.line_output.lines = function () {
		return Lines.find({});
	};
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // No startup code, currently.
  });
}

