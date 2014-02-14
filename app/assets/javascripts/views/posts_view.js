EggsBook.Views.PostsView = Backbone.View.extend({
  postsTemplate: JST['posts/index'],

  initialize: function() {
    this.listenToOnce(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.render);
  },

  render: function() {
    console.log("rendering posts!");
    this._renderSkeleton()
        ._renderPosts();
    return this;
  },

  _renderSkeleton: function() {
    var renderedContent = this.postsTemplate();
    this.$el.html(renderedContent);
    return this;
  },

  _renderPosts: function() {
    var postView;
    var $elToFill = this.$el.find('.posts');

    this.collection.models.forEach(function(post) {
      postView = new EggsBook.Views.PostView({model: post});
      $elToFill.append(postView.render().$el);
    });
    return this;
  },
});