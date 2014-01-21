EggsBook.Views.CommentView = Backbone.View.extend({
  skeletonTemplate: JST['comments/comment_skeleton'],
  likeButtonTemplate: JST['posts/like_button'],
  likingUsersTemplate: JST['posts/liking_users'],
  userPhotoTemplate: JST['comments/user_photo'],
  commentDetailsTemplate: JST['comments/details'],

  render: function() {
    // this.$el.html("single comment view will render here");

    this._renderSkeleton()
        ._renderUserPhoto()
        ._renderCommentDetails()
        ._renderLikeButton()
        ._renderLikingUsers();

    return this;
  },

  _renderSkeleton: function() {
    var renderedContent = this.skeletonTemplate();
    this.$el.html(renderedContent);
    return this;
  },

  _renderUserPhoto: function() {
    var renderedContent = this.userPhotoTemplate({
      user: this.model.get('user')
    });
    var $elToFill = this.$el.find('.user-photo');
    $elToFill.html(renderedContent);
    return this;
  },

  _renderCommentDetails: function() {
    var renderedContent = this.commentDetailsTemplate({
      objToRender: this.model
    });
    var $elToFill = this.$el.find('.details');
    $elToFill.html(renderedContent);
    return this;
  },

  _renderLikeButton: function() {
    var renderedContent = this.likeButtonTemplate({
      objToRender: this.model,
      currentUser: EggsBook.currentUser,
      dataType: "comment"
    });
    var $elToFill = this.$el.find('.like-button');
    $elToFill.html(renderedContent);
    return this;
  },

  _renderLikingUsers: function() {
    var renderedContent = this.likingUsersTemplate({
      objToRender: this.model
    });
    var $elToFill = this.$el.find('.liking-users');
    $elToFill.html(renderedContent);
    return this;
  }
});