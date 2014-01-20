EggsBook.Views.UserProfileView = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function() {
    this.postViews = {};
  },

  render: function() {
    return this.renderTop().renderPosts();
  },

  renderTop: function() {
    var renderedContent = this.template({
      user: this.model ,
      foods: EggsBook.foods
    });
    this.$el.html(renderedContent);
    return this;
  },

  renderPosts: function() {
    if(EggsBook.posts.models.length > 0) {
      var $posts = this.$el.find('.post');
      $.each($posts, function(i) {
        var jqPost = $posts.eq(i);
        var id = jqPost.data('id');
        var postModel = EggsBook.posts.get(id);
        var postView = new EggsBook.Views.PostView({model: postModel});
        jqPost.html(postView.render().$el);
      });
    }
    return this;
  }
});