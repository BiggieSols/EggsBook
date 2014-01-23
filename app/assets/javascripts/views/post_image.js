EggsBook.Views.PostImageView = Backbone.View.extend({
  tagName: 'span',
  template: JST['posts/show_photo'],

  render: function() {
    var renderedContent = this.template({post: this.model});
    this.$el.html(renderedContent);
    return this;
  },
});