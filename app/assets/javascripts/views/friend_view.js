EggsBook.Views.FriendView = Backbone.View.extend({
  template: JST['users/friend'],
  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  }
});