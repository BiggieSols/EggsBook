EggsBook.Models.FriendRequest = Backbone.Model.extend({
  urlRoot: function() {
    return '/users/' + this.get('friend_id') + '/friend_requests';
  }
});