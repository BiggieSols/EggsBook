EggsBook.Views.CommentView = Backbone.View.extend({
  template: JST['posts/comment_skeleton'],
  likeButtonTemplate: JST['posts/like_button'],
  likingUsersTemplate: JST['posts/liking_users'],
  userPhotoTemplate: JST['comments/comment_user_photo'],
  commentDetailsTemplate: JST['comments/comment_details'],

  render: function() {
    this.$el.append("comment view will render here");
    return this;
  },

  _renderUserPhoto: function() {
    var renderedContent = this.userPhotoTemplate({
      user: this.model.get('user')
    });
    this.$el.append(renderedContent);
    return this;
  },

  _renderCommentDetails: function() {
    var renderedContent = this.commentDetailsTemplate({
      objToRender: this.model
    });
    this.$el.append(renderedContent);
    return this;
  },

  _renderLikButton: function() {
    var renderedContent = this.likeButtonTemplate({
      objToRender: this.model
    });
    this.$el.append(renderedContent);
    return this;
  },

  _renderLikingUsers: function() {
    var renderedContent = this.likeButtonTemplate({
      objToRender: this.model
    });
    this.$el.append(renderedContent);
    return this;
  }
});