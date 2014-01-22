EggsBook.Views.UserProfileView = Backbone.View.extend({
  template: JST['users/show'],
  // postsSkeletonTemplate: JST['users/posts_skeleton'],
  photosSkeletonTemplate: JST['users/photos_skeleton'],
  friendsSkeletonTemplate: JST['users/friends_skeleton'],

  initialize: function() {
    this.postViews = {};
  },

  events: {
    'click #render-photos':'renderPhotos',
    'click #render-posts': 'renderPosts',
    'click #render-friends': 'renderFriends'
  },

  render: function() {
    return this._renderTop()._renderFriendButton().renderPosts();
  },

  _renderFriendButton: function() {
    var friendButtonView = new EggsBook.Views.FriendButton({model: this.model});
    this.$el.find('.friend-button').html(friendButtonView.render().$el);
    return this;
  },

  renderFriends: function() {
    var friendsView = new EggsBook.Views.FriendsView({model: this.model});
    $('#profile-content').html(friendsView.render().$el);
  },

  renderPhotos: function() {
    return this._renderPhotosSkeleton()._renderIndividualPhotos();
  },

  renderPosts: function() {
    var postsView = new EggsBook.Views.PostsView({
      collection: this.model.get('posts')
    });

    this.$el.find("#profile-content").html(postsView.render().$el);
    return this;
  },

  _renderTop: function() {
    console.log("rendering top");
    var renderedContent = this.template({
      user: this.model,
      foods: EggsBook.foods,
    });
    this.$el.html(renderedContent);
    return this;
  },

  _renderPostsSkeleton: function() {
    return this._renderSkeleton(this.postsSkeletonTemplate, {user: this.model});
  },

  _renderPhotosSkeleton: function() {
    return this._renderSkeleton(this.photosSkeletonTemplate, {user: this.model});
  },


  // move to renderAbstracted
  _renderIndividualPosts: function() {
    if(EggsBook.posts.models.length > 0) {
      var $posts = this.$el.find('.post-container');
      $.each($posts, function(i) {
        var jqPost = $posts.eq(i);
        var id = jqPost.data('id');
        var postModel = EggsBook.posts.get(id);
        var postView = new EggsBook.Views.PostView({model: postModel});
        jqPost.html(postView.render().$el);
      });
    }
    return this;
  },

  // move to renderAbstracted
  _renderIndividualPhotos: function() {
    if(EggsBook.posts.models.length > 0) {
      var $photos = this.$el.find('.photo');
      $.each($photos, function(i) {
        var jqPhoto = $photos.eq(i);
        var id = jqPhoto.data('id');
        var photoModel = EggsBook.posts.get(id);
        var photoView = new EggsBook.Views.PostImageView({model: photoModel});
        jqPhoto.html(photoView.render().$el);
      });
    }
    return this;
  },

  _renderSkeleton: function(template, passedArgs) {
    var $content = this.$el.find("#profile-content");
    var renderedContent = template(passedArgs);
    $content.html(renderedContent);
    return this;
  }
});

