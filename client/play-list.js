Template.playList.helpers({
	activePlays: function() {
    return Plays.find({active:true}, {sort: {id:-1}});
	},
  finishedPlays: function() {
    return Plays.find({active:false}, {sort: {id:-1}});
	}
});

Template.playList.events({
	'submit #new-play': function(event) {
		var newName = event.target.name.value;
    var maxPlay = Plays.findOne({}, {fields:{id: 1, _id: 0}}, {sort: {id:-1}});
    var newId = maxPlay.id+1;
    Plays.insert({id: newId, name: maxPlay, active: true});
	}
});

