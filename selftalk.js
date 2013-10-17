Lines = new Meteor.Collection("lines");

Lines.allow({
	// TODO: Consider using Collection2 to handle this type of thing, rather than manually writing these validation functions
  insert: function (userId, line) {
		// TODO: Turn this into a constant, here and for the HTML element's line
		return line.text.length <= 500;
	}
});

if (Meteor.isClient) {
	Template.line_input.events({
		'submit' : function() {
			Lines.insert({date_created: new Date(), text: line.value});

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
		// FIXME: This assumes that every single element in the DB has a date_created, but what if that isn't true? For example, when the
		// app was first written, that field didn't exist.
		// TODO: For performance reasons, specify the fields I want in the find()
		var lines = Lines.find({}, {sort: {date_created: -1}, limit: 20});

		// TODO: Simplify the code below
		var linesArr = new Array();
		lines.forEach(function (data) {
			linesArr.push(data);
		});
		linesArr.sort(function(a, b) {
			if (b.date_created > a.date_created) {
				return -1;
			} else if (b.date_created < a.date_created) {
				return 1;
			} else {
				return 0;
			}
		});

		return linesArr;
	};
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // No startup code, currently.
  });
}

