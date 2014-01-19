EggsBook.Views.PostView = Backbone.View.extend({
  events: {
    'submit #new_comment':'add_comment'
  },

  initialize: function() {
    this.listenTo(this.model.get('comments'), "all", this.render);
  },

  template: JST['posts/show'],

  render: function() {
    console.log("rendering")
    var renderedContent = this.template({post: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  add_comment: function(event) {
    var that = this;

    event.preventDefault();

    var formData = $(event.currentTarget).serializeJSON();
    formData.comment.post_id = this.model.id;
    console.log(formData);

    var comment = new EggsBook.Models.Comment(formData.comment);

    console.log(comment);

    comment.save({}, {
      success: function() {
        console.log("got here");
        that.model.get('comments').add(comment);
      },

      error: function() {
        console.log("it failed");
      }
    });
  }


});