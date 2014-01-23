EggsBook.Views.MutualFriendView = Backbone.View.extend({
  tagName: "span",

  template: JST['users/mutual_friend'],

  events: {
    "mouseover .mutual-friend": "triggerTooltip"
  },

  render: function() {
    var renderedContent = this.template({user: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  triggerTooltip: function(event) {
    $(event.currentTarget).tooltip("show");
  }
});