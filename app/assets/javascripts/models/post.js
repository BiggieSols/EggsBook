EggsBook.Models.Post = Backbone.Model.extend({
  urlRoot: '/posts',
  parse: function(response) {
    // need to switch this to use {parse: true} but running into a bug for some reason... TBD.
    var comments = new EggsBook.Collections.Comments();
    var parsed_comments = comments.parse(response.comments);
    comments.set(parsed_comments);
    response.comments = comments;

    response.user = new EggsBook.Models.User(response.user);
    response.liking_users = new EggsBook.Collections.Users(response.liking_users);
    return response;
  },

  collection: EggsBook.Collections.posts
});