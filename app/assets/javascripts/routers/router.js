EggsBook.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    // initializing collections to track previously loaded info
    EggsBook.users = new EggsBook.Collections.Users();
    EggsBook.posts = new EggsBook.Collections.Posts();
    EggsBook.comments = new EggsBook.Collections.Comments();
    EggsBook.foods = new EggsBook.Collections.Foods();
    EggsBook.currentUser = new EggsBook.Models.User({'id': 'current'});

    EggsBook.foods.fetch();
    EggsBook.posts.fetch();
    // EggsBook.users.fetch();
    // EggsBook.posts.fetch();
    // EggsBook.comments.fetch();
    // EggsBook.foods.fetch();
  },

  routes: {
    '': 'feed',
    'users/:id' : 'user',
    'posts/:id' : 'post'
  },

  post: function(id) {
    if(!EggsBook.currentUser.get('name')) EggsBook.currentUser.fetch();
    console.log("on show post route");
    var that = this;

    this._getPost(id, function(post) {
      var postView = new EggsBook.Views.PostView({model: post});
      that._swapView(postView);
    });
  },

  user: function(id) {
    if(!EggsBook.currentUser.get('name')) EggsBook.currentUser.fetch();

    var that = this;
    this._getUser(id, function(user) {
      var userProfileView = new EggsBook.Views.UserProfileView({model: user});
      that._swapView(userProfileView);
    });
  },

  _getPost: function(id, callback) {
    var post = EggsBook.posts.get(id);
    if (!post) {
      EggsBook.posts.fetch({
        success: function() {
          callback(EggsBook.posts.get(id));
        }
      });
    } else {
      callback(post);
    }
  },

  // change this to pull down all users. less secure, but will be faster.
  _getUser: function(id, callback) {
    var user = EggsBook.users.get(id);
    if (!user) {
      EggsBook.users.fetch({
        success: function() {
          callback(EggsBook.users.get(id));
        }
      });
    } else {
      callback(user);
    }
  },

  _swapView: function(view) {
    if(this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;

    this.$rootEl.html(view.render().$el);
  }
})