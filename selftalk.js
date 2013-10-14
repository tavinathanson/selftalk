Lines = new Meteor.Collection("lines");

if (Meteor.isClient) {
	Template.line_input.events({
		'submit' : function() {
    	Lines.insert({text: line.value});

			var output = $('#line-output');
			var height = output[0].scrollHeight;
			output.scrollTop(height);

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

