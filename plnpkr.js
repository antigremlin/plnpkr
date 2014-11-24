Plays = new Mongo.Collection("plays");
Tasks = new Mongo.Collection("tasks");
Votes = new Mongo.Collection(null);

if (Meteor.isClient) {
  Session.setDefault("currentPlay", null);
  Session.setDefault("currentTask", null);

  Template.body.helpers({
    currentPlay: function() {
      return Session.get("currentPlay");
    },
    tasks: function() {
      return Tasks.find({});
    },
    noTask: function() {
      return Session.get("currentTask") == null;
    },
    currentTask: function() {
      var t = Tasks.findOne(Session.get("currentTask"));
      console.log("currentTask" + EJSON.stringify(t));
      return t;
    }
  });

  Template.votingResults.helpers({
    votes: function() {
      return Votes.find({});
    }
  });

  Template.task.helpers({
    voteStr: function() {
      return EJSON.stringify(this.votes);
    }
  });

  Template.body.events({
    "submit .new-task": function(event) {
      var _id = Tasks.insert({
        text: event.target.text.value,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user.username()
      });
      Session.set("currentTask", _id);
      Votes.remove({});
      event.target.text.value = "";
      return false;
    },
    "change .vote-select": function(event) {
      Votes.insert({vote: $(event.target).val()});
      return false;
    },
    "click .vote-button": function(event) {
      Votes.insert({vote: $(event.target).val()});
    },
    "click .save-button": function(event) {
      var _id = Session.get("currentTask");
      Tasks.update(_id, {$set: {votes: Votes.find({}).fetch()}});
      Session.set("currentTask", null);
      return false;
    }
  });

  Template.playControl.events({
    "submit .join-session": function(e) {
      var _id = e.target.text.value;
      console.log("Joining session " + _id);
      var play = Plays.findOne(_id);
      Meteor.users.update(Meteor.userId, {$set: {playId: play._id}});
      Plays.update(_id, {$inc: {activeUsers: 1}});
      if (play) {
        Session.set("currentPlay", play._id);
      }
      return false;
    },
    "click .new-session": function(e) {
      var _id = Plays.insert({
        owner: Meteor.userId
      });
      console.log("Created play " + _id);
      Session.set("currentPlay", _id);
      return false;
    },
    "click .list-sessions": function(e) {

    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
