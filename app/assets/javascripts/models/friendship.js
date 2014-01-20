EggsBook.Models.Friendship = Backbone.Model.extend({
  urlRoot: function() {
    return '/users/' + this.get('friend_id') + '/friendships';
  }
});