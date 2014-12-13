Meteor.startup(function() {
	if (Plays.find().count() == 0) {
		Plays.insert({id: 5, name: 'Play 1', active: true});
		Plays.insert({id: 4, name: 'Grass on the Balcony', active: true});
    Plays.insert({id: 3, name: 'Play 3', active: false});
    Plays.insert({id: 2, name: 'FXConnect integration', active: false});
    Plays.insert({id: 1, name: 'Spaghetti Bolognese', active: false});
	}
	if (Stories.find().count() == 0) {
		Stories.insert({play: 5, name: 'Story 1', estimate: 5});
		Stories.insert({play: 5, name: 'Story 2', estimate: 3});
		Stories.insert({play: 5, name: 'Story 3', estimate: 8});
		Stories.insert({play: 4, name: 'Water the grass', estimate: 2});
    Stories.insert({play: 4, name: 'Plant some grass on the balcony', estimate: 5});
		Stories.insert({play: 3, name: 'Story 2', estimate: 3});
		Stories.insert({play: 3, name: 'Story 3', estimate: 8});
		Stories.insert({play: 2, name: 'Let developers work', estimate: 2});
    Stories.insert({play: 2, name: 'read FXC doc', estimate: 5});
		Stories.insert({play: 1, name: 'Mix everything', estimate: 3});
		Stories.insert({play: 1, name: 'Boil spaghetti', estimate: 8});
		Stories.insert({play: 1, name: 'Fry some meat', estimate: 2});
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

