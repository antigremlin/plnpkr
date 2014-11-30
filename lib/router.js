Router.route('/join', function() {
	this.render('Join');
});

Router.route('/play/:_id', function() {
	console.log(this.params._id);
	Meteor.subscribe('stories', this.params._id);
	this.render('Play');
});

Router.route('/playlist', function() {
	this.render('PlayList');
});
