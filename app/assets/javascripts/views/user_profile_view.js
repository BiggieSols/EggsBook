EggsBook.Views.UserProfileView = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function() {
    this.postViews = {};
    this.listenTo(EggsBook.currentUser, "sync", this.renderTop);
  },

  events: {
    'click .friend-remove':'friendRemove',
    'click .friend-confirm':'friendConfirm',
    'click .friend-add':'friendAdd'
  },

  render: function() {
    return this.renderTop().renderPosts();
  },

  renderTop: function() {
    console.log("rendering top");
    var renderedContent = this.template({
      user: this.model ,
      foods: EggsBook.foods,
      currentUser: EggsBook.currentUser
    });
    this.$el.html(renderedContent);
    return this;
  },

  renderPosts: function() {
    if(EggsBook.posts.models.length > 0) {
      var $posts = this.$el.find('.post');
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

  friendRemove: function(event) {
    console.log("attempting to remove friend");
    var friendship = new EggsBook.Models.Friendship({"friend_id": this.model.id});
    // set dummy id
    friendship.id = -1;
    var that = this;

    friendship.destroy({
      success: function() {
        console.log("got here");
        EggsBook.currentUser.fetch();
      }, 

      error: function() {
        console.log("failed");
      }
    });
  },

  friendConfirm: function(event) {
    console.log("attempting to confirm friend");
    this.render();
  },

  friendAdd: function(event) {
    console.log("attempting to add friend");
    this.render();
  }
});