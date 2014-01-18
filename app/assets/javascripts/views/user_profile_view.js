EggsBook.Views.UserProfileView = Backbone.View.extend({
  template: JST['users/show'],

  render: function() {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})