EggsBook.Views.FriendsView = Backbone.View.extend({
  friends_skeleton_template: JST['users/friends_skeleton'],

  renderFriendsSkeleton: function() {
    var renderedContent = this.friends_skeleton_template({
      user: this.model,
      currentUser: EggsBook.currentUser
    });
    this.$el.html(renderedContent);
    return this;
  },

  render: function() {
    return this.renderFriendsSkeleton().renderIndividualFriends();
  },

  renderIndividualFriends: function() {
    var $friends = this.$el.find('.friend');
    console.log($friends);

    EggsBook.friendList = $friends;

    $.each($friends, function(i) {
      var jqFriend = $friends.eq(i);
      var id = jqFriend.data('id');
      var friend = EggsBook.users.get(id);


      // console.log("friend is below");
      // console.log(friend);


      var friendView = new EggsBook.Views.FriendView({model: friend});
      jqFriend.html(friendView.render().$el);
    });
    return this;
  }
});