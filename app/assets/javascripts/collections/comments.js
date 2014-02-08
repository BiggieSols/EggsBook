EggsBook.Collections.Comments = Backbone.Collection.extend({
  url: '/comments',
  model: EggsBook.Models.Comment,
  parse: function(response) {
    obj_response = [];
    response.forEach(function(comment) {
      var comment_model = new EggsBook.Models.Comment();
      var parsedComment = comment_model.parse(comment);
      comment_model.set(parsedComment);
      obj_response.push(comment);
    });
    return obj_response;
  }
});