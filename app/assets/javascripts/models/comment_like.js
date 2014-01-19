EggsBook.Models.CommentLike = Backbone.Model.extend({
  urlRoot: function() {
    return '/comments/' + this.get('comment_id') + '/like';
  }
});