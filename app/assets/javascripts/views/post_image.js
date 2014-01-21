EggsBook.Views.PostImage = Backbone.View.extend({
  tagName: 'span',
  template: JST['posts/show_photo'],

  events: {
    "click .post-image":"enlargeImage"
  },

  render: function() {
    var renderedContent = this.template({post: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  enlargeImage: function() {
  }
});