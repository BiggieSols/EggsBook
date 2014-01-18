EggsBook.Models.Post = Backbone.Model.extend({
  parse: function(response) {
    response.comments = new EggsBook.Collections.Comments(response.comments);
    response.user = new EggsBook.Models.User(response.user);
    return response;
  },

  collection: EggsBook.Collections.posts
});