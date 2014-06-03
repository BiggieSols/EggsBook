EggsBook.Views.FriendButton = Backbone.View.extend({
  template: JST['users/friend_button'],

  initialize: function() {
    this.listenTo(EggsBook.currentUser, "sync", this.render);
  },

  events: {
    'click .friend-remove':'friendRemove',
    'click .friend-confirm':'friendConfirm',
    'click .friend-add':'friendAdd',
  },

  render: function() {
    var renderedContent = this.template({
      user: this.model,
      currentUser: EggsBook.currentUser
    });
    this.$el.html(renderedContent);
    return this;
  },

  friendRemove: function() {
    console.log("attempting to remove friend");
    var friendship = new EggsBook.Models.Friendship({"friend_id": this.model.id});

    // set dummy id
    friendship.id = -1;

    friendship.destroy({
      success: function() {
        console.log("got here");
        EggsBook.currentUser.fetch();
      },
    });
  },

  friendConfirm: function() {
    console.log("attempting to confirm friend");
    var friendship = new EggsBook.Models.Friendship({"friend_id": this.model.id});

    friendship.save({}, {
      success: function() {
        EggsBook.currentUser.fetch();
      }
    });
  },

  friendAdd: function() {
    console.log("attempting to add friend");
    var friendRequest = new EggsBook.Models.FriendRequest({"friend_id": this.model.id});
    friendRequest.save({}, {
      success: function() {
        console.log("friend request added");
        EggsBook.currentUser.fetch();
      }
    });
  }
});