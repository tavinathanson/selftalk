Lines = new Meteor.Collection("lines");

if (Meteor.isClient) {
	Template.line_input.events({
		'submit' : function() {
    	Lines.insert({text: line.value});
		}
	});

	Template.line_list.lines = function () {
		return Lines.find({});
	};
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // No startup code, currently.
  });
}
