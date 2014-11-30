Meteor.startup(function() {
	if (Plays.find().count() == 0) {
		Plays.insert({id: 1, name: 'Play 1', active: true});
		Plays.insert({id: 2, name: 'Play 2', active: false});
	}
	if (Stories.find().count() == 0) {
		Stories.insert({play: 1, name: 'Story 1', estimate: 5});
		Stories.insert({play: 1, name: 'Story 2', estimate: 3});
		Stories.insert({play: 1, name: 'Story 3', estimate: 8});
		Stories.insert({play: 2, name: 'Story 4', estimate: 2});
	}
	if (Votes.find().count() == 0) {
		Votes.insert({user: 'Tigger', value: 3});
		Votes.insert({user: 'Piglet', value: 5});
		Votes.insert({user: 'Pooh', value: 1});
	}
	Votes.remove({user: 'Rabbit'});
});

Meteor.publish(null, function() { return Plays.find(); });
Meteor.publish(null, function() { return Votes.find(); });
Meteor.publish("stories", function(id) {
	return Stories.find({play: Number(id)});
});

