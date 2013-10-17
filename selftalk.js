// Some file-scope constants
var constants = new (function() {
    this.getMaxLineLength = function() { return 500; };
		this.getNumLinesShown = function() { return 20; };
})();

Lines = new Meteor.Collection("lines");

// TODO: Consider using Collection2 to handle this type of thing, rather than manually writing these validation functions
Lines.allow({
  insert: function (userId, line) {
		return line.text.length <= constants.getMaxLineLength();
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
		/* Set the scrollTop to the entire height of the content, which will scroll the div down to the bottom
		 * See: http://labs.revelationglobal.com/2010/02/04/javascript_scrolling_geometry.html */
 		$("#line-output").scrollTop($("#line-output")[0].scrollHeight);
	};

	Template.line_output.lines = function () {
		// Get the most recently created N lines by sorting in reverse-chronological order
		/* FIXME: This assumes that every single element in the DB has a date_created, but what if that isn't true? For example, when the
		 * app was first written, that field didn't exist. */
		var lines = Lines.find({}, {fields: {text: 1, date_created: 1}, sort: {date_created: -1}, limit: constants.getNumLinesShown()});

		// Reverse the lines back (to regular chronological order) by creating a new array and sorting it
		/* NOTE: Since find(...) returns a cursor, and Meteor doesn't currently support the Mongo sort function, this array-conversion
		 * appears to be necessary. Is it? */
		var linesArr = new Array();
		lines.forEach(function (data) { linesArr.push(data); });
		linesArr.sort(function(a, b) { return b.date_created > a.date_created ? -1 : b.date_created < a.date_created ? 1 : 0;	});

		return linesArr;
	};

	Template.line_input.max_length = constants.getMaxLineLength();
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // No startup code, currently.
  });
}

