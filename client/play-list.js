Template.playList.helpers({
	plays: function() {
		return Plays.find();
	}
});

Template.playList.events({
	'submit #new-play': function(event) {
		var newName = event.target.name.value;
		Plays.insert({id: 0, name: newName});
	}
});

