EggsBook.Views.MutualFriendsView = Backbone.View.extend({
  tagName: "span",
  
  render: function() {
    var mutualFriendView;
    var that = this;
    this.collection.models.forEach(function(mutualFriend) {
      mutualFriendView = new EggsBook.Views.MutualFriendView({
        model: mutualFriend
      });
      that.$el.append(mutualFriendView.render().$el);
    });
    return this;
  },
});