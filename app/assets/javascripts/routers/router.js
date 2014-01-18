EggsBook.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    // initializing collections to track previously loaded info
    EggsBook.users = new EggsBook.Collections.Users();
    EggsBook.posts = new EggsBook.Collections.Posts();
    EggsBook.comments = new EggsBook.Collections.Comments();
    EggsBook.foods = new EggsBook.Collections.Foods();
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
    console.log("on show post route");
    var that = this;

    this._getPost(id, function(post) {
      var postView = new EggsBook.Views.PostView({model: post});
      that._swapView(postView);
    });
  },

  user: function(id) {
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

  _getUser: function(id, callback) {
    var user = EggsBook.users.get(id);
    if (!user) {
      user = EggsBook.users.create();
      user.id = id;
      user.fetch({
        success: function() {
          callback(user);
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