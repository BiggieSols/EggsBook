EggsBook.Models.PostLike = Backbone.Model.extend({
  urlRoot: function() {
    return '/posts/' + this.get('post_id') + '/like';
  }
});