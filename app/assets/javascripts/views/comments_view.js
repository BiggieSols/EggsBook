EggsBook.Views.CommentView = Backbone.View.extend({
  template: JST['comments/index'],

  render: function() {
    // var renderedContent = this.template({comments: this.collection});
    var that = this;
    var commentView;
    this.collection.models.forEach(function(comment) {
      commentView = new EggsBook.Views.CommentView({model: comment});
      that.$el.append(commentView.render().$el);
    });
  },
});