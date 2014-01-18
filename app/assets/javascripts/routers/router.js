EggsBook.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    EggsBook.posts = new EggsBook.Collections.Posts();
    EggsBook.posts.fetch();
  },

  routes: {
    '': 'feed',
    'users/:id' : 'show_user',
    'posts/:id' : 'show_post'
  },

  show_post: function(id) {
    console.log("on show post route")
    var that = this;

    this._getPost(id, function(post) {
      var postView = new EggsBook.Views.PostView({model: post});
      that._swapView(postView);
    })
  },

  _getPost: function(id, callback) {
    var post = EggsBook.posts.get(id);
    if (!post) {
      EggsBook.posts.fetch({
        success: function() {
          callback(EggsBook.posts.get(id));
        }
      })
    } else {
      callback(post);
    }
  }, 

  _swapView: function(view) {
    if(this.currentView) {
      this.currentView.remove;
    }
    this.currentView = view;
    
    this.$rootEl.html(view.render().$el);
  }
})