EggsBook.Models.Post = Backbone.Model.extend({
  parse: function(response) {
    // need to explicitly call parse since the data is not coming from the server
      // method 1
        // var parsed_comments = new EggsBook.Collections.Comments().parse(response.comments);
        // response.comments = new EggsBook.Collections.Comments(parsed_comments);

    // method 2
    var comments = new EggsBook.Collections.Comments();
    var parsed_comments = comments.parse(response.comments);
    comments.set(parsed_comments);
    console.log(comments);
    response.comments = comments;

    response.user = new EggsBook.Models.User(response.user);
    response.liking_users = new EggsBook.Collections.Users(response.liking_users);
    return response;
  },

  collection: EggsBook.Collections.posts
});