EggsBook.Views.NewSessionView = Backbone.View.extend({
  events: {
    "submit #new-session":"submit"
  },

  template: JST['new_session/new_session'],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    console.log("so far so good!");
    var formData = $(event.currentTarget).serializeJSON();
    this.model.set(formData);
    this.model.save({}, {
      success: function() {
        console.log("log in successful");
      },
      error: function() {
        console.log("log in failed");
      }
    });
  }
}); 