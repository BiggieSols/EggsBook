EggsBook.Models.User = Backbone.Model.extend({
  // confirm that this will happen automatically, but seems likely
  urlRoot: '/users',

  initialize: function() {
    this.listenTo(EggsBook.foods, "sync", this.render);
  },

  // parse: function(response) {
  //   console.log(response);
  //   return response;
  // },

  parse: function(response) {
    var posts = new EggsBook.Collections.Posts(response.posts, {parse: true});
    response.posts = posts;
    return response;
  },

  friendStatus: function(otherUser) {
    otherId = otherUser.id;
    if(otherUser.id === this.id) return "yourself";

    if(_.include(this.get('friend_ids'), otherId)) {
      return "friend";
    } else if(_.include(this.get('friends_requested_ids'), otherId)) {
      return "requiresFriendResponse";
    } else if(_.include(this.get('users_requesting_friendship_ids'), otherId)) {
      return "requiresYourResponse";
    } else {
      return "notFriends";
    }
  }
});