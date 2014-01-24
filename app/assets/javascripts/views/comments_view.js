EggsBook.Views.CommentsView = Backbone.View.extend({
  commentsTemplate: JST['comments/index'],
  newCommentTemplate: JST['comments/new_comment_form'],

  events: {
    'submit .new-comment':'addComment',
  },

  render: function() {
    this._renderSkeleton()
        ._renderComments()
        ._renderCommentForm();
    return this;
  },

  _renderSkeleton: function() {
    var renderedContent = this.commentsTemplate();
    this.$el.html(renderedContent);
    return this;
  },

  _renderComments: function() {
    var commentView;
    var $elToFill = this.$el.find('.comments');

    this.collection.models.forEach(function(comment) {
      commentView = new EggsBook.Views.CommentView({model: comment});
      $elToFill.append(commentView.render().$el);
    });
    return this;
  },

  _renderCommentForm: function() {
    var $elToFill = this.$el.find('.comment-form');
    var renderedContent = this.newCommentTemplate();
    $elToFill.html(renderedContent);
    return this;
  },

  addComment: function(event) {
    var that = this;
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();

    this.$el.find('#comment_details').prop("disabled", true);

    formData.comment.post_id = this.post_id;

    var comment = new EggsBook.Models.Comment(formData.comment);

    console.log(comment);

    comment.save({}, {
      success: function() {
        that.collection.add(comment);
      },
    });
  },
});