EggsBook.Models.Post = Backbone.Model.extend({
  initialize: function(options) {
    // this.liking_users = options.liking_users //this is a collection of users
    // this.comments = options.comments //this is a collection of comments
  },

  parse: function(response, options) {
    var comments_arr = [];
    response.comments.forEach(function(comment) {
      var commentObj = new EggsBook.Models.Comment()
      commentObj.id = comment.id
      commentObj.fetch({
        success: function() {
          comments_arr.push(EggsBook.comments.get(commentObj));
        }
      })
    });

    response.comments = comments_arr;

    console.log(response);

    return response;
  },

  collection: EggsBook.Collections.posts
})