EggsBook.Models.Post = Backbone.Model.extend({
  initialize: function(options) {
    // this.liking_users = options.liking_users //this is a collection of users
    // this.comments = options.comments //this is a collection of comments
  },

  collection: EggsBook.Collections.posts
})