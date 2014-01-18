EggsBook.Models.User = Backbone.Model.extend({
  // confirm that this will happen automatically, but seems likely
  initialize: function(options) {
    this.posts = options.posts
  },

  urlRoot: '/users',

  parse: function(response, options) {
    console.log(response);
    return response;
  }
})