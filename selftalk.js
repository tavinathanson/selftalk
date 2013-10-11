Lines = new Meteor.Collection("lines");

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to selftalk.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

	Template.line_list.lines = function () {
		return Lines.find({});
	};
}

if (Meteor.isServer) {
	Lines.remove();
	Lines.insert({text: "test_line"});

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
