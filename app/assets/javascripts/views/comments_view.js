EggsBook.Views.CommentsView = Backbone.View.extend({
  template: JST['comments/index'],

  events: {
      'submit .new-comment':'add_comment',
  },

  render: function() {
    var renderedContent = this.template({comments: this.collection});
    var that = this;
    var commentView;
    this.collection.models.forEach(function(comment) {
      commentView = new EggsBook.Views.CommentView({model: comment});
      that.$el.append(commentView.render().$el);
    });
    // this.$el.html("<div>comments view will go here</div>");
    return this;
  },

  add_comment: function(event) {
    var that = this;
    event.preventDefault();

    var formData = $(event.currentTarget).serializeJSON();
    formData.comment.post_id = this.model.id;

    var comment = new EggsBook.Models.Comment(formData.comment);

    console.log(comment);

    comment.save({}, {
      success: function() {
        that.collection.add(comment);
      },
    });
  },
});