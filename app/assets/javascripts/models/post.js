EggsBook.Models.Post = Backbone.Model.extend({
  parse: function(response) {
    var comments_arr = [];
    response.comments.forEach(function(comment) {
      var commentObj = new EggsBook.Models.Comment();
      commentObj.id = comment.id;
      commentObj.fetch({
        success: function() {
          comments_arr.push(EggsBook.comments.get(commentObj));
        }
      });
    });

    response.comments = comments_arr;

    console.log(new EggsBook.Models.Post(response));

    return response;
  },

  collection: EggsBook.Collections.posts
});