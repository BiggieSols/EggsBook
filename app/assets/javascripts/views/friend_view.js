EggsBook.Views.FriendView = Backbone.View.extend({
  template: JST['users/friend'],
  render: function() {
    return this._renderSkeleton()._renderMutualFriends();
  },

  _renderSkeleton: function() {
    var renderedContent = this.template({
      user: this.model,
      currentUser: EggsBook.currentUser
    });
    this.$el.html(renderedContent);
    return this;
  },

  _renderMutualFriends: function() {
    var mutualFriends = new EggsBook.Collections.Users();
    EggsBook.currentUser
      .mutualFriends(this.model)
      .forEach(function(friend_id) {
        mutualFriends.add(EggsBook.users.get(friend_id));
    });

    var mutualFriendsView = new EggsBook.Views.MutualFriendsView({collection: mutualFriends});
    var $elToFill = this.$el.find('.mutual-friends');
    $elToFill.html(mutualFriendsView.render().$el);
    return this;
  }
});