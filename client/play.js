Template.play.helpers({
	votes: function() {
		return Votes.find();
	},
	stories: function() {
		//console.log(Router.current().params);
		//{play: Router.current().params['_id']}
		return Stories.find();
	},
	playid: function() {
		return Router.current().params['_id'];
	}
});

Template.play.events({
	'click #btn-vote': function() {
		var val = $('#vote-value .active input')[0].value;
		var user = Meteor.user();
		var prev = Votes.findOne({user: user.username});
		if (typeof prev == 'undefined') {
			Votes.insert({user: user.username, value: val});
		} else {
			Votes.update(prev._id, {$set: {value: val}});
		}
	},
	'click #btn-submit-sp': function(event) {
		var sp = event.target.estimate.value;
    Story.update(this._id, {$set: {estimate: sp}});
	}
});
