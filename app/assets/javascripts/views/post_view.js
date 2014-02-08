EggsBook.Views.PostView = EggsBook.Views.LikableObject.extend({
  initialize: function() {
    this.listenTo(this.model.get('liking_users'), "add remove", this.render);
    this.listenTo(this.model.get('comments'), "add remove change", this.render);
    this.listenTo(EggsBook.currentUser, "sync change add", this.render);
  },

  template: JST['posts/show'],
  postSkeletonTemplate: JST['posts/post_skeleton'],
  commentSkeletonTemplate: JST['posts/comment_skeleton'],
  likeButtonTemplate: JST['posts/like_button'],
  likingUsersTemplate: JST['posts/liking_users'],
  detailsTemplate: JST['posts/details'],

  render: function() {
    return this.render_post_piecewise();
  },


  // TODO: replace render function with this
  render_post_piecewise: function() {
    return this._renderPostSkeleton()
               ._renderLikeButton()
               ._renderLikingUsers()
               ._renderComments();
  },

  _renderPostSkeleton: function() {
    var renderedContent = this.postSkeletonTemplate({post: this.model});
    this.$el.html(renderedContent);
    return this;
  },

  _renderLikeButton: function() {
    var renderedContent = this.likeButtonTemplate({
      objToRender: this.model, 
      dataType: "post",
      currentUser: EggsBook.currentUser
    });
    var $elToFill = this.$el.find('.like-button');
    $elToFill.html(renderedContent);
    EggsBook.tempView = this;
    return this;
  },

  _renderLikingUsers: function(){
    var renderedContent = this.likingUsersTemplate({
      objToRender: this.model,
    });
    var $elToFill = this.$el.find('.liking-users');
    $elToFill.html(renderedContent);
    return this;
  },

  _renderDetails: function() {
    var renderedContent = this.likeButtonTemplate({objToRender: this.model});
    var $elToFill = this.$el.find('.details');
    $elToFill.html(renderedContent);
    return this;
  },

  _renderComments: function() {
    var comments = this.model.get('comments');
    var commentsView = new EggsBook.Views.CommentsView({collection: comments});

    commentsView.post_id = this.model.id;

    var renderedContent = commentsView.render().$el;
    var $elToFill = this.$el.find('.post-comments');
    $elToFill.html(renderedContent);
    return this;
  }
});