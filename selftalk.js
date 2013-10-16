Lines = new Meteor.Collection("lines");

Lines.allow({
  insert: function (userId, line) {
		return line.text.length <= 500;
	}
});

if (Meteor.isClient) {
	Template.line_input.events({
		'submit' : function() {
    	Lines.insert({text: line.value});

			// Clear the text field, and prevent the page from reloading on submit
			line.value = "";
			return false;
		}
	});

	Template.line_output.rendered = function () {
		// Set the scrollTop to the entire height of the content, which will scroll the div down to the bottom
		// See: http://labs.revelationglobal.com/2010/02/04/javascript_scrolling_geometry.html
 		$("#line-output").scrollTop($("#line-output")[0].scrollHeight);
	};

	Template.line_output.lines = function () {
		return Lines.find({}, {sort: {$natural: 1}});
	};
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // No startup code, currently.
  });
}

