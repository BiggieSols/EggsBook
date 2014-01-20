EggsBook.Views.FeedView = Backbone.View.extend({
  initialize: function() {
    this.collection.fetch();
    this.listenTo(EggsBook.feed, "sync", this.render);
  },

  template: JST['feed/show'],

  render: function() {
    return this.renderTop().renderPosts();
  },

  renderTop: function() {
    console.log("rendering top of feed");
    var renderedContent = this.template({
      user: this.model,
      currentUser: EggsBook.currentUser,
      feed: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  },

  renderPosts: function() {
    if(this.collection.models.length > 0) {
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
  },
});